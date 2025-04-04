package br.alertarisk.services;

import br.alertarisk.dto.AlertaApiDTO;
import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.exception.ValidationException;
import br.alertarisk.models.Alerta;
import br.alertarisk.repositories.AlertaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlertaMergeService {

    private final AlertaRepository alertaRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    // Coordinates for API call – these could be parameterized or otherwise configured.
    private static final double RECIFE_LAT = -8.0476;
    private static final double RECIFE_LON = -34.8770;

    /**
     * Calls the API, merges API alerts with the existing ones, and saves them.
     */
    public List<Alerta> mergeAndSaveApiAlerts() {
        String url = String.format(
                "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
                RECIFE_LAT, RECIFE_LON, apiKey
        );

        ResponseEntity<AlertaApiDTO> response = restTemplate.getForEntity(url, AlertaApiDTO.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            AlertaApiDTO apiDTO = response.getBody();
            List<Alerta> apiAlerts = apiDTO.getAlerta();
            List<Alerta> mergedAlerts = new ArrayList<>();

            for (Alerta apiAlert : apiAlerts) {

                Optional<Alerta> existingAlertOpt = (apiAlert.getId() != null)
                        ? alertaRepository.findById(apiAlert.getId())
                        : Optional.empty();

                if (existingAlertOpt.isPresent()) {
                    Alerta merged = mergeAlerts(existingAlertOpt.get(), apiAlert);
                    mergedAlerts.add(alertaRepository.save(merged));
                } else {
                    // When saving a new alert, determine the level based on the API data.
                    double rainVolume = (apiAlert.getRainVolume() != null) ? apiAlert.getRainVolume() : 0.0;
                    apiAlert.setNivel(determineAlertaNivel(rainVolume));
                    mergedAlerts.add(alertaRepository.save(apiAlert));
                }
            }
            return mergedAlerts;
        } else {
            throw new ValidationException("Erro ao buscar alertas da API.");
        }
    }


    private Alerta mergeAlerts(Alerta existing, Alerta apiAlert) {
        if (apiAlert.getRainVolume() != null) {
            existing.setRainVolume(apiAlert.getRainVolume());
        }
        if (apiAlert.getLatitude() != null) {
            existing.setLatitude(apiAlert.getLatitude());
        }
        if (apiAlert.getLongitude() != null) {
            existing.setLongitude(apiAlert.getLongitude());
        }
        // Update core properties if needed
        existing.setStatus(apiAlert.getStatus());
        existing.setCategoria(apiAlert.getCategoria());

        double rainVolume = (apiAlert.getRainVolume() != null) ? apiAlert.getRainVolume() : 0.0;
        existing.setNivel(determineAlertaNivel(rainVolume));

        return existing;
    }

    public AlertaNivel determineAlertaNivel(double rainVolume) {
        if (rainVolume <= 0) {
            return AlertaNivel.VERDE;
        } else if (rainVolume > 0 && rainVolume < 10) {
            return AlertaNivel.AMARELO;
        } else {
            return AlertaNivel.VERMELHO;
        }
    }
}
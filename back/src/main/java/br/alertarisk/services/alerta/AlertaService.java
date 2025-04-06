package br.alertarisk.services.alerta;

import br.alertarisk.dto.WeatherResponse;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.exception.ValidationException;
import br.alertarisk.models.Alerta;
import br.alertarisk.repositories.AlertaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static br.alertarisk.enums.AlertaStatus.ATIVO;
import static br.alertarisk.enums.CategoriaPostagem.ALAGAMENTO;

@Service
@RequiredArgsConstructor
public class AlertaService {

    private final AlertaRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final AlertaMergeService alertaMergeService;

    @Value("${api.key}")
    private String apiKey;

    private static final double RECIFE_LAT = -8.0476;
    private static final double RECIFE_LON = -34.8770;

    private boolean alertExists(Double latitude, Double longitude, CategoriaPostagem categoria, AlertaStatus status, Double rainVolume) {
        return repository.existsByLatitudeAndLongitudeAndCategoriaAndStatusAndRainVolume(
                latitude, longitude, categoria, status, rainVolume
        );
    }

    public Alerta newAlert() {
        String url = String.format(
                "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
                RECIFE_LAT, RECIFE_LON, apiKey
        );

        ResponseEntity<WeatherResponse> response = restTemplate.getForEntity(url, WeatherResponse.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            WeatherResponse weatherResponse = response.getBody();

            double lat = weatherResponse.getCoord().getLat();
            double lon = weatherResponse.getCoord().getLon();

            double rainVolume = (weatherResponse.getRain() != null && weatherResponse.getRain().getOneH() != null)
                    ? weatherResponse.getRain().getOneH()
                    : 0.0;

            LocalDateTime alertCreationTime =
                    LocalDateTime.ofEpochSecond(weatherResponse.getDt(), 0, ZoneOffset.UTC);

            // Check if an alert with the same attributes already exists
            if (alertExists(lat, lon, ALAGAMENTO, ATIVO, rainVolume)) {
                throw new IllegalStateException("An alert with the same attributes already exists.");
            }

            Alerta alerta = new Alerta();
            alerta.setStatus(ATIVO);
            alerta.setCategoria(ALAGAMENTO);
            alerta.setNivel(alertaMergeService.determineAlertaNivel(rainVolume));
            alerta.setLatitude(lat);
            alerta.setLongitude(lon);
            alerta.setRainVolume(rainVolume);
            alerta.setCreatedAt(alertCreationTime);

            return repository.save(alerta);
        } else {
            throw new ValidationException("Erro ao buscar dados da API.");
        }
    }

    public List<Alerta> list() {
        return repository.findAll();
    }

    public Alerta findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Alerta não encontrado com o id: " + id)
        );
    }

    public Alerta save(final Alerta alerta) {
        alerta.setStatus(ATIVO);
        if (alertExists(alerta.getLatitude(), alerta.getLongitude(), alerta.getCategoria(), alerta.getStatus(),alerta.getRainVolume())) {
            throw new IllegalStateException("An alert with the same attributes already exists.");
        }
        return repository.save(alerta);
    }

    public Alerta update(final Alerta alerta) {
        Alerta existAlerta = repository.findById(alerta.getId()).orElseThrow(
                () -> new NotFoundException("Alerta não encontrado")
        );
        existAlerta.setEndereco(alerta.getEndereco());
        existAlerta.setNivel(alerta.getNivel());
        return repository.save(existAlerta);
    }

    public void delete(final Long id) {
        repository.findById(id).orElseThrow(
                () -> new NotFoundException("Alerta não encontrado com o id: " + id)
        );
        repository.deleteById(id);
    }
}
package br.alertarisk.services.alerta;

import br.alertarisk.bairros.BairrosData;
import br.alertarisk.controllers.request.alerta.CoordenadaBairro;
import br.alertarisk.dto.WeatherResponse;
import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.models.Alerta;
import br.alertarisk.models.Endereco;
import br.alertarisk.repositories.AlertaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static br.alertarisk.enums.AlertaNivel.VERDE;
import static br.alertarisk.enums.AlertaStatus.ATIVO;
import static br.alertarisk.enums.CategoriaPostagem.ALAGAMENTO;

@Service
@RequiredArgsConstructor
public class AlertaMergeService {

    private final AlertaRepository alertaRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    private static final List<CoordenadaBairro> bairros = List.of(
            new CoordenadaBairro("Aflitos", -8.0389, -34.8975 ),
            new CoordenadaBairro("Afogados",  -8.0712, -34.9081 ),
            new CoordenadaBairro("Água Fria",  -8.0167, -34.8917 ),
            new CoordenadaBairro("Alto José Bonifácio", -8.0389, -34.9286 ),
            new CoordenadaBairro("Alto José do Pinho", -8.0250, -34.9000 ),
            new CoordenadaBairro("Alto do Mandu", -8.0333, -34.9167 ),
            new CoordenadaBairro("Alto do Pascoal",  -8.0500, -34.9333 ),
            new CoordenadaBairro("Alto Santa Teresinha",  -8.0167, -34.9167 ),
            new CoordenadaBairro("Apipucos", -8.0167, -34.9333 ),
            new CoordenadaBairro("Areias", -8.1167, -34.9167 ),
            new CoordenadaBairro("Arruda",  -8.0333, -34.8833 ),
            new CoordenadaBairro("Barro", -8.1000, -34.9333 ),
            new CoordenadaBairro("Beberibe",  -8.0167, -34.9000 ),
            new CoordenadaBairro("Benfica",  -8.0667, -34.9000 ),
            new CoordenadaBairro("Boa Viagem", -8.1281, -34.9007 ),
            new CoordenadaBairro("Boa Vista",  -8.0500, -34.8833 ),
            new CoordenadaBairro("Bomba do Hemetério", -8.0333, -34.9000 ),
            new CoordenadaBairro("Bongi",   -8.0833, -34.9167 ),
            new CoordenadaBairro("Brasília Teimosa", -8.0833, -34.8833 ),
            new CoordenadaBairro("Brejo do Beberibe",  -8.0000, -34.9000 ),
            new CoordenadaBairro("Brejo da Guabiraba",   -7.9833, -34.9167 ),
            new CoordenadaBairro("Cabanga",   -8.0667, -34.8833 ),
            new CoordenadaBairro("Caçote",   -8.0500, -34.9167 ),
            new CoordenadaBairro("Cajueiro",   -8.0167, -34.8833 ),
            new CoordenadaBairro("Campina do Barreto",   -8.0333, -34.8667 ),
            new CoordenadaBairro("Campo Grande",   -8.0333, -34.8833 ),
            new CoordenadaBairro("Casa Amarela",   -8.0167, -34.9167 ),
            new CoordenadaBairro("Casa Forte",   -8.0333, -34.9167 ),
            new CoordenadaBairro("Caxangá",   -8.0333, -34.9500 ),
            new CoordenadaBairro("Cidade Universitária",   -8.0500, -34.9500 ),
            new CoordenadaBairro("Coelhos",   -8.0667, -34.8833 ),
            new CoordenadaBairro("Cohab",   -8.1333, -34.9167 ),
            new CoordenadaBairro("Comunidade do Pilar",   -8.0667, -34.8667 ),
            new CoordenadaBairro("Coque",   -8.0667, -34.8833 ),
            new CoordenadaBairro("Coqueiral",   -8.0833, -34.9333 ),
            new CoordenadaBairro("Cordeiro",   -8.0500, -34.9167 ),
            new CoordenadaBairro("Córrego do Jenipapo",   -8.0167, -34.8833 ),
            new CoordenadaBairro("Curado",   -8.0833, -34.9667 ),
            new CoordenadaBairro("Derby",   -8.0500, -34.9000 ),
            new CoordenadaBairro("Dois Irmãos",   -8.0167, -34.9333 ),
            new CoordenadaBairro("Dois Unidos",   -8.0000, -34.9167 ),
            new CoordenadaBairro("Encruzilhada",   -8.0333, -34.8833 ),
            new CoordenadaBairro("Engenho do Meio",   -8.0500, -34.9333 ),
            new CoordenadaBairro("Entra Apulso",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Espinheiro",   -8.0333, -34.9000 ),
            new CoordenadaBairro("Estância",   -8.1000, -34.9333 ),
            new CoordenadaBairro("Fundão",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Graças",   -8.0333, -34.9000 ),
            new CoordenadaBairro("Guabiraba",   -7.9833, -34.9333 ),
            new CoordenadaBairro("Hipódromo",   -8.0333, -34.8833 ),
            new CoordenadaBairro("Ibura",   -8.1167, -34.9333 ),
            new CoordenadaBairro("Ilha Joana Bezerra",   -8.0667, -34.8833 ),
            new CoordenadaBairro("Ilha do Leite",   -8.0667, -34.9000 ),
            new CoordenadaBairro("Ilha do Retiro",   -8.0667, -34.9000 ),
            new CoordenadaBairro("Imbiribeira",   -8.1000, -34.9167 ),
            new CoordenadaBairro("Ipsep",   -8.1167, -34.9167 ),
            new CoordenadaBairro("Iputinga",   -8.0333, -34.9333 ),
            new CoordenadaBairro("Jaqueira",   -8.0333, -34.9000 ),
            new CoordenadaBairro("Jardim São Paulo",   -8.0833, -34.9333 ),
            new CoordenadaBairro("Jiquiá",   -8.0833, -34.9000 ),
            new CoordenadaBairro("Jordão",   -8.1333, -34.9333 ),
            new CoordenadaBairro("Linha do Tiro",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Macaxeira",   -8.0167, -34.9167 ),
            new CoordenadaBairro("Madalena",   -8.0539, -34.9088 ),
            new CoordenadaBairro("Mangabeira",   -8.0167, -34.8833 ),
            new CoordenadaBairro("Mangueira",   -8.0500, -34.9000 ),
            new CoordenadaBairro("Monteiro",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Morro da Conceição",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Mustardinha",   -8.0667, -34.9167 ),
            new CoordenadaBairro("Nova Descoberta",   -8.0000, -34.9167 ),
            new CoordenadaBairro("Paissandu",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Parnamirim",   -8.0333, -34.9000 ),
            new CoordenadaBairro("Passarinho",   -7.9833, -34.9167 ),
            new CoordenadaBairro("Pau Ferro",   -8.0167, -34.8833 ),
            new CoordenadaBairro("Peixinhos",   -8.0167, -34.8667 ),
            new CoordenadaBairro("Pina",   -8.0833, -34.8833 ),
            new CoordenadaBairro("Poço da Panela",   -8.0167, -34.9333 ),
            new CoordenadaBairro("Ponte de Uchoa",   -8.0833, -34.9000 ),
            new CoordenadaBairro("Ponto de Parada",   -8.0500, -34.9000 ),
            new CoordenadaBairro("Porto da Madeira",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Prado",   -8.0667, -34.9167 ),
            new CoordenadaBairro("Recife",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Rosarinho",   -8.0333, -34.8833 ),
            new CoordenadaBairro("San Martin",   -8.0833, -34.9167 ),
            new CoordenadaBairro("Sancho",   -8.0833, -34.9333 ),
            new CoordenadaBairro("Santana",   -8.0333, -34.9167 ),
            new CoordenadaBairro("Santo Amaro",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Santo Antônio",   -8.0667, -34.8833 ),
            new CoordenadaBairro("São José",   -8.0667, -34.8833 ),
            new CoordenadaBairro("Setúbal",   -8.1333, -34.9000 ),
            new CoordenadaBairro("Sítio dos Pintos",   -7.9833, -34.9167 ),
            new CoordenadaBairro("Soledade",   -8.0500, -34.8833 ),
            new CoordenadaBairro("Tamarineira",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Tejipió",   -8.0833, -34.9333 ),
            new CoordenadaBairro("Torre",   -8.0500, -34.9167 ),
            new CoordenadaBairro("Torreão",   -8.0333, -34.8833 ),
            new CoordenadaBairro("Torrões",   -8.0500, -34.9333 ),
            new CoordenadaBairro("Totó",   -8.1000, -34.9333 ),
            new CoordenadaBairro("Várzea",   -8.0333, -34.9500 ),
            new CoordenadaBairro("Vasco da Gama",   -8.0167, -34.9000 ),
            new CoordenadaBairro("Vila Tamandaré",   -8.0167, -34.8833 ),
            new CoordenadaBairro("Zumbi",   -8.0667, -34.8667 )

    );

    public List<Alerta> mergeAndSaveApiAlerts() {
        List<Alerta> mergedAlerts = new ArrayList<>();

        for (CoordenadaBairro coord : bairros) {
            try {
                String url = String.format(
                        "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
                        coord.lat(), coord.lon(), apiKey
                );

                ResponseEntity<WeatherResponse> response = restTemplate.getForEntity(url, WeatherResponse.class);

                double rainVolume = 0.0;
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    WeatherResponse weatherResponse = response.getBody();
                    rainVolume = (weatherResponse.getRain() != null) ? weatherResponse.getRain().getOneH() : 0.0;
                }

                // Create or update the alert for the neighborhood
                Alerta alerta = createOrUpdateAlerta(coord, rainVolume);
                mergedAlerts.add(alertaRepository.save(alerta));

            } catch (Exception e) {
                System.err.println("Error fetching data for " + coord.bairro() + ": " + e.getMessage());
                // Create a default alert in case of an error
                Alerta alerta = createDefaultAlerta(coord);
                mergedAlerts.add(alertaRepository.save(alerta));
            }
        }

        return mergedAlerts;
    }

    private Alerta createOrUpdateAlerta(CoordenadaBairro coord, double rainVolume) {
        Optional<Alerta> existingAlertOpt = alertaRepository.findByLatitudeAndLongitude(coord.lat(), coord.lon());

        Alerta alerta = existingAlertOpt.orElseGet(Alerta::new);
        alerta.setStatus(ATIVO);
        alerta.setCategoria(ALAGAMENTO);
        alerta.setNivel(determineAlertaNivel(rainVolume));
        alerta.setLatitude(coord.lat());
        alerta.setLongitude(coord.lon());
        alerta.setRainVolume(rainVolume);
        alerta.setCreatedAt(LocalDateTime.now());

        Endereco endereco = alerta.getEndereco();
        if (endereco == null) {
            endereco = new Endereco();
            alerta.setEndereco(endereco);
        }
        endereco.setBairro(coord.bairro());
        endereco.setCidade("Recife");
        endereco.setEstado("PE");
        endereco.setCep(BairrosData.getCepByNeighborhood(coord.bairro()));
        endereco.setRua("Unknown");

        return alerta;
    }

    private Alerta createDefaultAlerta(CoordenadaBairro coord) {
        Alerta alerta = new Alerta();
        alerta.setStatus(ATIVO);
        alerta.setCategoria(ALAGAMENTO);
        alerta.setNivel(VERDE); // Default to safe level
        alerta.setLatitude(coord.lat());
        alerta.setLongitude(coord.lon());
        alerta.setRainVolume(0.0); // No rain data available
        alerta.setCreatedAt(LocalDateTime.now());

        Endereco endereco = new Endereco();
        endereco.setBairro(coord.bairro());
        endereco.setCidade("Recife");
        endereco.setEstado("PE");
        endereco.setCep("00000000");
        endereco.setRua("Unknown");
        alerta.setEndereco(endereco);

        return alerta;
    }

    public AlertaNivel determineAlertaNivel(double rainVolume) {
        if (rainVolume <= 10) {
            return AlertaNivel.VERDE; // Safe
        } else if (rainVolume <= 30) {
            return AlertaNivel.AMARELO; // Moderate
        } else {
            return AlertaNivel.VERMELHO; // Severe
        }
    }
}
package br.alertarisk.services.alerta;


import br.alertarisk.controllers.request.alerta.CoordenadaBairro;
import br.alertarisk.dto.WeatherResponse;
import br.alertarisk.exception.ValidationException;
import br.alertarisk.models.Alerta;
import br.alertarisk.models.Endereco;
import br.alertarisk.repositories.AlertaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import static br.alertarisk.enums.AlertaStatus.ATIVO;
import static br.alertarisk.enums.CategoriaPostagem.ALAGAMENTO;

@Service
@RequiredArgsConstructor
public class ChuvaAlertaService {

        private final AlertaRepository repository;
        private final RestTemplate restTemplate = new RestTemplate();
        private final AlertaMergeService alertaMergeService;

        @Value("${api.key}")
        private String apiKey;

        private static final double RAIN_THRESHOLD = 0.0;

        private final List<CoordenadaBairro> bairros = List.of(
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
                new CoordenadaBairro("Ponte d\"Uchoa",   -8.0833, -34.9000 ),
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


        public List<Alerta> fetchAndSaveChuvaAlertas() {
            List<Alerta> alerts = new ArrayList<>();
            for (CoordenadaBairro coord : bairros) {
                String url = String.format(
                        "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
                        coord.lat(), coord.lon(), apiKey
                );

                ResponseEntity<WeatherResponse> response = restTemplate.getForEntity(url, WeatherResponse.class);
                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    WeatherResponse weatherResponse = response.getBody();
                    double rainVolume = (weatherResponse.getRain() != null && weatherResponse.getRain().getOneH() != null)
                            ? weatherResponse.getRain().getOneH()
                            : 0.0;

                    if (rainVolume > RAIN_THRESHOLD) {
                        Alerta alerta = new Alerta();
                        alerta.setStatus(ATIVO);
                        alerta.setCategoria(ALAGAMENTO);

                        alerta.setNivel(alertaMergeService.determineAlertaNivel(rainVolume));


                        alerta.setLatitude(weatherResponse.getCoord().getLat());
                        alerta.setLongitude(weatherResponse.getCoord().getLon());
                        alerta.setRainVolume(rainVolume);


                        Endereco endereco = new Endereco();
                        endereco.setBairro(coord.bairro());

                        alerta.setEndereco(endereco);


                        LocalDateTime alertCreationTime = LocalDateTime.ofEpochSecond(weatherResponse.getDt(), 0, ZoneOffset.UTC);

                        alerts.add(repository.save(alerta));
                    }
                } else {
                    throw new ValidationException("Erro ao buscar dados da API para " + coord.bairro());
                }
            }
            return alerts;
        }
    }


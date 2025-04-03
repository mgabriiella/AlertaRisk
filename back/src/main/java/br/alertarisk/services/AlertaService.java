package br.alertarisk.services;

import br.alertarisk.controllers.response.clima.ListAlertaResponse;
import br.alertarisk.dto.AlertaApiDTO;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.exception.ValidationException;
import br.alertarisk.models.Alerta;
import br.alertarisk.repositories.AlertaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static br.alertarisk.enums.AlertaStatus.ATIVO;
import static br.alertarisk.enums.CategoriaPostagem.ALAGAMENTO;

@Service
@RequiredArgsConstructor
public class AlertaService {

    private final AlertaRepository repository;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    private static final double RECIFE_LAT = -8.0476;
    private static final double RECIFE_LON = -34.8770;

    public Alerta newAlert() {

        String url = String.format(
                "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
                RECIFE_LAT, RECIFE_LON, apiKey
        );


        ResponseEntity<AlertaApiDTO> response = restTemplate.getForEntity(url, AlertaApiDTO.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            AlertaApiDTO alertaApi = response.getBody();


            if (alertaApi.getAlerta() != null) {
                for (Alerta alertaFromApi : alertaApi.getAlerta()) {
                    if (alertaFromApi.getCategoria() == ALAGAMENTO) {

                        Alerta newAlerta = save(alertaFromApi);
                        return repository.save(newAlerta);
                    }
                }
            }
            throw new ValidationException("Sem alertas válidos na requisição para a API");
        } else {
            throw new ValidationException("Erro ao buscar dados da API.");
        }
    }

    public List<Alerta>list() {
        return repository.findAll();
    }

    public Alerta findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Alerta nao encontrado com o id: " + id)
        );
    }

    public Alerta save(final Alerta alerta) {
        alerta.setCategoria(alerta.getCategoria());
        alerta.setNivel(alerta.getNivel());
        alerta.setStatus(ATIVO);
        alerta.setEndereco(alerta.getEndereco());
        return repository.save(alerta);
    }

    public Alerta update(final Alerta alerta) {
        Alerta existAlerta = repository.findById(alerta.getId()).orElseThrow(
                () -> new NotFoundException("Alerta não encontrado")
        );
        existAlerta.setEndereco(alerta.getEndereco());
        existAlerta.setNivel(alerta.getNivel());
        existAlerta.setEndereco(alerta.getEndereco());

        return repository.save(existAlerta);
    }

    public void delete(final Long id){
        repository.findById(id);
        repository.deleteById(id);
    }
}
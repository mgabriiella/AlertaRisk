package br.alertarisk.services.alerta;

import br.alertarisk.dto.WeatherResponse;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.exception.ValidationException;
import br.alertarisk.models.Alerta;
import br.alertarisk.models.Endereco;
import br.alertarisk.models.UserModel;
import br.alertarisk.repositories.AlertaRepository;
import br.alertarisk.repositories.EnderecoRepository;
import br.alertarisk.services.EnderecoService;
import br.alertarisk.services.TwilioService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
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
    private final EnderecoService enderecoService;
    private final TwilioService twilioService;

    public Alerta save(final Alerta alerta, String cep, String bairro, String rua, String cidade, String estado, UserModel user) {
        alerta.setStatus(ATIVO);

        // Busca ou cria o endereço associado ao alerta
        Endereco endereco = enderecoService.findOrCreateEndereco(cep, bairro, rua, cidade, estado, user);
        alerta.setEndereco(endereco);

        // Salva o alerta
        Alerta savedAlerta = repository.save(alerta);

        // Notifica os usuários associados ao endereço
        notifyUsers(savedAlerta);

        return savedAlerta;
    }

    private void notifyUsers(Alerta alerta) {
        Endereco endereco = alerta.getEndereco();
        if (endereco != null && endereco.getUser() != null) {
            String userPhone = endereco.getUser().getPhone();
            if (userPhone != null && !userPhone.isBlank()) {
                twilioService.sendAlertMessage(
                        String.format("%s, %s, %s", endereco.getRua(), endereco.getBairro(), endereco.getCidade()),
                        alerta.getCategoria().toString(),
                        alerta.getNivel().toString(),
                        alerta.getCreatedAt().toString(),
                        userPhone
                );
            }
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


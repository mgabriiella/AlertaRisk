package br.alertarisk.services;

import br.alertarisk.exception.NotFoundException;
import br.alertarisk.models.Endereco;
import br.alertarisk.repositories.EnderecoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository repository;

    public List<Endereco> list() {
        return repository.findAll();
    }

    public Endereco findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Endereco não encontrado")
        );

    }
    public Endereco save(final Endereco endereco) {
        return repository.save(endereco);
    }

    public Endereco update(final Endereco endereco) {
        Endereco existEndereco = repository.findById(endereco.getId()).orElseThrow(
                () -> new NotFoundException("Endereço não encontrado"));

        existEndereco.setName(endereco.getName());
        existEndereco.setCep(endereco.getCep());
        existEndereco.setNumero(endereco.getNumero());

        return repository.save(existEndereco);
    }

    public void delete(final Long id) {
        repository.findById(id);
        repository.deleteById(id);
    }

}

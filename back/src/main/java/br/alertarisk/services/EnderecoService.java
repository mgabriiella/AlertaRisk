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

    public List<Endereco> findAll() {
        return repository.findAll();
    }
    public Endereco save(final Endereco endereco) {
        return repository.save(endereco);
    }
    public Endereco update(final Endereco endereco) {
        Endereco existEndereco = repository.findById(endereco.getId()).orElseThrow(
                () -> new NotFoundException("Endereço não encontrado"));
        existEndereco.setCep(endereco.getCep());
        existEndereco.setNome(endereco.getNome());

        return repository.save(existEndereco);
    }
    

}

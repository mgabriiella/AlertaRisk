package br.alertarisk.services;

import br.alertarisk.exception.NotFoundException;
import br.alertarisk.models.Endereco;
import br.alertarisk.models.UserModel;
import br.alertarisk.repositories.EnderecoRepository;
import br.alertarisk.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository repository;

    public Endereco findOrCreateEndereco(String cep, String bairro, String rua, String cidade, String estado, UserModel user) {
        Optional<Endereco> existingEndereco = repository.findByCepAndBairro(cep, bairro);

        if (existingEndereco.isPresent()) {
            return existingEndereco.get();
        }

        Endereco newEndereco = new Endereco();
        newEndereco.setCep(cep);
        newEndereco.setBairro(bairro);
        newEndereco.setRua(rua);
        newEndereco.setCidade(cidade);
        newEndereco.setEstado(estado);
        newEndereco.setUser(user);

        return repository.save(newEndereco);
    }


    public List<Endereco> list() {
        Iterable<Endereco> enderecosIterable = repository.findAll();
        return StreamSupport.stream(enderecosIterable.spliterator(), false)
                .collect(Collectors.toList());
    }

    public Endereco findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Endereco não encontrado")
        );

    }
    public Endereco save(final Endereco endereco)
    {
        return repository.save(endereco);
    }

    public Endereco update(final Endereco endereco) {
        Endereco existEndereco = repository.findById(endereco.getId()).orElseThrow(
                () -> new NotFoundException("Endereço não encontrado"));

        existEndereco.setCep(endereco.getCep());
        existEndereco.setRua(endereco.getRua());
        existEndereco.setBairro(endereco.getBairro());
        existEndereco.setEstado(endereco.getEstado());
        existEndereco.setCidade(endereco.getCidade());

        return repository.save(existEndereco);
    }

    public void delete(final Long id) {
        repository.findById(id);
        repository.deleteById(id);
    }

}

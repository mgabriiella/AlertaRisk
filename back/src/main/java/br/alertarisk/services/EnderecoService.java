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

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository repository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<Endereco> list() {
        return repository.findAll();
    }

    public Endereco findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Endereco não encontrado")
        );

    }
    public Endereco save(final Endereco endereco)
    {
        boolean userExists = userRepository.existsByEmail(endereco.getUser().getEmail());
        if (!userExists) {
            throw new NotFoundException("Usuário não encontrado");
        }
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

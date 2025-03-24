package br.alertarisk.services;

import br.alertarisk.exception.InUseException;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.models.UserModel;
import br.alertarisk.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    public List<UserModel> list() {
        return repository.findAll();
    }

    public UserModel findById(final UUID id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Usuário não encontrado com o id " + id)
        );
    }


    public void verifyPhone(final String phone) {
        if (repository.existsByPhone(phone)) {
            var message = String.format("Número de telefone %s Já está em uso", phone);
            throw new InUseException(message);
        }

    }

    public void verifyPhone(final UUID id,final String phone) {
        var optional = repository.findByPhone(phone);
        if (optional.isPresent() && !Objects.equals(optional.get().getPhone(),phone)) {
            var message = String.format("Número de telefone %s Já está em uso", phone);
            throw new InUseException(message);
        }
    }

    public void verifyEmail(final String email) {
        if (repository.existsByEmail(email)) {
            var message = String.format("O Endereço de email %s Já está em uso", email);
            throw new InUseException(message);
        }
    }

    public void verifyEmail(final UUID id,final String email) {
        var optional = repository.findByEmail(email);
        if (optional.isPresent() && !Objects.equals(optional.get().getEmail(),email)) {
            var message = String.format("O Endereço de email %s Já está em uso", email);
            throw new InUseException(message);
        }
    }

    @Transactional
    public UserModel save(final UserModel user) {
        verifyEmail(user.getEmail());
        verifyPhone(user.getPhone());

        if(user.getEnderecos() == null || user.getEnderecos().isEmpty()) {
            throw new NotFoundException("O usuário precisa conter um Endereço válido");
        }

        user.getEnderecos().forEach(endereco -> endereco.setUser(user));

        var pass = passwordEncoder.encode(user.getPassword());
        user.setPassword(pass);

        return repository.save(user);
    }

    public UserModel update(final UserModel user) {
        UserModel existUser = repository.findById(user.getId()).orElseThrow(
                () -> new NotFoundException("Usuário não encontrado")
        );
        verifyEmail(user.getId(), user.getEmail());
        verifyPhone(user.getId(), user.getPhone());

        if(user.getEnderecos() == null || user.getEnderecos().isEmpty()) {
            throw new NotFoundException("O usuário precisa conter um Endereço válido");
        }

        existUser.setName(user.getName());
        existUser.setEmail(user.getEmail());
        existUser.setPhone(user.getPhone());

        existUser.getEnderecos().clear();
        existUser.getEnderecos().addAll(user.getEnderecos());
        existUser.getEnderecos().forEach(endereco -> endereco.setUser(user));

        return repository.save(existUser);
    }

    public void delete(final UUID id) {
        repository.findById(id);
        repository.deleteById(id);
    }

}

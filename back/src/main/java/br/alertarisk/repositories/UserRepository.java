package br.alertarisk.repositories;

import br.alertarisk.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {


    List<UserModel> findByCpf(String cpf);

    boolean existsByPhone(String phone);

    Optional<UserModel> findByPhone(String phone);

    boolean existsByEmail(String email);

    Optional<UserModel> findByEmail(String phone);
}

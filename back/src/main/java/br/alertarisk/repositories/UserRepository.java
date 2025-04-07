package br.alertarisk.repositories;

import br.alertarisk.models.UserModel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<UserModel, UUID> {



    boolean existsByPhone(String phone);

    Optional<UserModel> findByPhone(String phone);

    boolean existsByEmail(String email);

    Optional<UserModel> findByEmail(String email);

    Object findByPassword(String password);

    @EntityGraph(attributePaths = "enderecos")
    Optional<UserModel> findById(UUID id);

    List<UserModel> findByName(String name);

    @Query("SELECT u FROM UserModel u JOIN u.enderecos e WHERE e.bairro = :bairro AND e.cep = :cep")
    Optional<UserModel> findByBairroAndCep(@Param("bairro") String bairro, @Param("cep") String cep);

}

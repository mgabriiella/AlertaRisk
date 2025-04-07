package br.alertarisk.repositories;

import br.alertarisk.models.Endereco;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnderecoRepository extends CrudRepository<Endereco, Long> {

    @Query(value = "SELECT * FROM endereco e " +
            "ORDER BY earth_distance(ll_to_earth(e.latitude, e.longitude), ll_to_earth(?1, ?2)) ASC " +
            "LIMIT 1", nativeQuery = true)
    Endereco findNearestAddress(Double latitude, Double longitude);

    Optional<Endereco> findByCepAndBairro(String cep, String bairro);
}
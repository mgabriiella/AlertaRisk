package br.alertarisk.repositories;

import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.models.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {

    Optional<Alerta> findByLatitudeAndLongitude(Double latitude, Double longitude);

    boolean existsByLatitudeAndLongitudeAndCategoriaAndStatus(Double latitude, Double longitude, CategoriaPostagem categoria, AlertaStatus status);

    boolean existsByLatitudeAndLongitudeAndCategoriaAndStatusAndRainVolume(Double latitude, Double longitude, CategoriaPostagem categoria, AlertaStatus status, Double rainVolume);
}

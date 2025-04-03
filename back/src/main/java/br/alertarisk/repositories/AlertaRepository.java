package br.alertarisk.repositories;

import br.alertarisk.models.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
}

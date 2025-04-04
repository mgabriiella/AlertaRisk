package br.alertarisk.repositories;

import br.alertarisk.models.AlertaAtivo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertaAtivoRepository extends JpaRepository<AlertaAtivo, Long> {
}

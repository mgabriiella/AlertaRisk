package br.alertarisk.repositories;

import br.alertarisk.models.AlertaPostagemStatus;
import br.alertarisk.models.IdAlertaPostagemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertaPostagensStatusRepository extends JpaRepository<AlertaPostagemStatus, IdAlertaPostagemStatus> {
}

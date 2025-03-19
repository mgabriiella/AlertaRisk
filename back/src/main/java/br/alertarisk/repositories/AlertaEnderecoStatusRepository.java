package br.alertarisk.repositories;

import br.alertarisk.models.AlertaEnderecoStatus;
import br.alertarisk.models.IdAlertaEnderecoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertaEnderecoStatusRepository extends JpaRepository<AlertaEnderecoStatus, IdAlertaEnderecoStatus> {
}

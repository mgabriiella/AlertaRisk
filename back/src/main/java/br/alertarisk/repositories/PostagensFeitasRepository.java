package br.alertarisk.repositories;

import br.alertarisk.models.PostagensFeitas;
import br.alertarisk.models.IdPostagensFeitas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostagensFeitasRepository extends JpaRepository<PostagensFeitas, IdPostagensFeitas> {
}

package br.alertarisk.repositories;

import br.alertarisk.models.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {
}

package br.alertarisk.repositories;

import br.alertarisk.models.PostagemEnderecoStatus;
import br.alertarisk.models.IdPostagemEnderecoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostagemEnderecoStatusRepository extends JpaRepository<PostagemEnderecoStatus, IdPostagemEnderecoStatus> {
}

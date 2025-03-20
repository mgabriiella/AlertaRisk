package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
public class IdPostagemEnderecoStatus implements Serializable {

    @Column(name = "id_post", nullable = false)
    private Long idPost;

    @Column(name = "id_endereco", nullable = false)
    private Long idEndereco;
}

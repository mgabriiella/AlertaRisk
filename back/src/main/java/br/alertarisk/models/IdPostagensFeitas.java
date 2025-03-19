package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
public class IdPostagensFeitas implements Serializable {

    @Column(name = "id_usuario", nullable = false)
    private UUID idUsuario;

    @Column(name = "id_post", nullable = false)
    private UUID idPost;
}

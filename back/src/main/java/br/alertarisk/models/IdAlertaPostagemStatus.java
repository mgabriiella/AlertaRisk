package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;

@Embeddable
@Data
public class IdAlertaPostagemStatus implements Serializable {

    @Column(name = "id_alerta", nullable = false)
    private Long idAlerta;

    @Column(name = "id_post", nullable = false)
    private Long idPost;
}

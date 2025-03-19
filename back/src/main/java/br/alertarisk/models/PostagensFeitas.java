package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "POSTAGENS_FEITAS")
public class PostagensFeitas {

    @EmbeddedId
    private IdPostagensFeitas id;

    @ManyToOne
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("idPost")
    @JoinColumn(name = "id_post", nullable = false)
    private Postagem postagem;
}

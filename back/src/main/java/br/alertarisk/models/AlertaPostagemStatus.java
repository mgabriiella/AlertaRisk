package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ALERTA_POSTAGEM_STATUS")
public class AlertaPostagemStatus {

    @EmbeddedId
    private IdAlertaPostagemStatus id;

    @ManyToOne
    @MapsId("idAlerta")
    @JoinColumn(name = "id_alerta", nullable = false)
    private Alerta alerta;

    @ManyToOne
    @MapsId("idPost")
    @JoinColumn(name = "id_post", nullable = false)
    private Postagem post;
}

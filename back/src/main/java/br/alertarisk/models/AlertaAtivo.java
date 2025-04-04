package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ALERTA_ATIVO")
public class AlertaAtivo {

        @EmbeddedId
        private AlertaAtivoId id;

        @ManyToOne
        @MapsId("id")
        @JoinColumn(name = "id_alerta", nullable = false)
        private Alerta alerta;
}

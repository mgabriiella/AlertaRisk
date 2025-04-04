package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ALERTA_ENDERECO_STATUS")
public class AlertaEnderecoStatus {

    @EmbeddedId
    private IdAlertaEnderecoStatus id;

    @ManyToOne
    @MapsId("idAlerta")
    @JoinColumn(name = "id_alerta", nullable = false)
    private Alerta alerta;

    @ManyToOne
    @MapsId("idEndereco")
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;
}

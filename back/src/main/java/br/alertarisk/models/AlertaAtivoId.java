package br.alertarisk.models;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;

@Embeddable
@Data
public class AlertaAtivoId implements Serializable {

    @Column(name = "id_alerta", nullable = false)
    private Long idAlerta;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertaNivel alertaNivel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertaStatus alertaStatus;
}

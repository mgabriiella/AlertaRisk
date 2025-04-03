package br.alertarisk.dto;

import br.alertarisk.models.Alerta;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class AlertaApiDTO {

    private List<Alerta> alerta;

}

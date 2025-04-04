package br.alertarisk.controllers.response.clima;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.models.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;

public record DetailAlertaResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("status")
        AlertaStatus status,
        @JsonProperty("categoria")
        CategoriaPostagem categoria,
        @JsonProperty("nivel")
        AlertaNivel nivel,
        @JsonProperty("endereco")
        Endereco endereco
)
{}

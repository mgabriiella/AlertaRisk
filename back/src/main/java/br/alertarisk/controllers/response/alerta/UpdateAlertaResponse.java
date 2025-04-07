package br.alertarisk.controllers.response.alerta;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record UpdateAlertaResponse (
        @JsonProperty("id")
        Long id,
        @JsonProperty("status")
        AlertaStatus status,
        @JsonProperty("categoria")
        CategoriaPostagem categoria,
        @JsonProperty("nivel")
        AlertaNivel nivel,
        @JsonProperty("bairro")
        String bairro,
        @JsonProperty("cep")
        String cep,
        @JsonProperty("cidade")
        String cidade,
        @JsonProperty("estado")
        String estado
) { }
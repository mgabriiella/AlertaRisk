package br.alertarisk.controllers.response.alerta;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonProperty;

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
        String bairro, // Extracted from Endereco
        @JsonProperty("cidade")
        String cidade, // Extracted from Endereco
        @JsonProperty("estado")
        String estado  // Extracted from Endereco
) { }
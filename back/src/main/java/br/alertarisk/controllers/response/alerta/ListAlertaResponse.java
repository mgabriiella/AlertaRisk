package br.alertarisk.controllers.response.alerta;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record ListAlertaResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("status")
        AlertaStatus status,
        @JsonProperty("categoria")
        CategoriaPostagem categoria,
        @JsonProperty("nivel")
        AlertaNivel nivel,
        @JsonProperty("rainVolume")
        Double rainVolume,
        @JsonProperty("latitude")
        Double latitude,
        @JsonProperty("longitude")
        Double longitude,
        @JsonProperty("descricao")
        String descricao,
        @JsonProperty("createdAt")
        LocalDateTime createdAt,
        @JsonProperty("bairro")
        String bairro, // Add this field
        @JsonProperty("cidade")
        String cidade, // Add this field
        @JsonProperty("estado")
        String estado  // Add this field
) { }
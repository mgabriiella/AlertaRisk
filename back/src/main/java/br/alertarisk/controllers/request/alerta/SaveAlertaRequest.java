package br.alertarisk.controllers.request.alerta;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record SaveAlertaRequest(
        @NotNull @JsonProperty("status") AlertaStatus status,
        @NotNull @JsonProperty("categoria") CategoriaPostagem categoria,
        @NotNull @JsonProperty("nivel") AlertaNivel nivel,
        @NotNull @JsonProperty("bairro") String bairro,
        @JsonProperty("latitude") Double latitude,
        @JsonProperty("longitude") Double longitude,
        @JsonProperty("rainVolume") Double rainVolume,
        @JsonProperty("descricao") String descricao, 
        @JsonProperty("createdAt") LocalDateTime createdAt
) { }
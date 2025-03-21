package br.alertarisk.controllers.request.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record SaveEnderecoRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @JsonProperty("cep")
        String cep,
        @NotNull
        @JsonProperty("numero")
        String numero
        ){ }

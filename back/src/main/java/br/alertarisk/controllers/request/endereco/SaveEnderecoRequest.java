package br.alertarisk.controllers.request.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record SaveEnderecoRequest(
        @NotNull
        @JsonProperty("cep")
        @Length(min = 8, max = 8,message = "O campo [cep] deve conter 8 caracteres")
        String cep,

        @NotNull
        @JsonProperty("rua")
        String rua,

        @NotNull
        @JsonProperty("bairro")
        String bairro,

        @NotNull
        @JsonProperty("estado")
        String estado

        ){ }

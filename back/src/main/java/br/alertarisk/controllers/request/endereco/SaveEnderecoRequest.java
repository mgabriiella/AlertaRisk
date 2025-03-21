package br.alertarisk.controllers.request.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record SaveEnderecoRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @JsonProperty("cep")
        @Length(min = 8, max = 8,message = "O campo [cep] deve conter 8 caracteres")
        String cep,
        @NotNull
        @JsonProperty("numero")
        String numero
        ){ }

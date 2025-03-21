package br.alertarisk.controllers.response.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record UpdateEnderecoResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("name")
        String name,
        @JsonProperty("cep")
        String cep,
        @JsonProperty("numero")
        String numero
){ }
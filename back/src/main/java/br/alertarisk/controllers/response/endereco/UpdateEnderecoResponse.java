package br.alertarisk.controllers.response.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record UpdateEnderecoResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("cep")
        String cep,

        @JsonProperty("rua")
        String rua,

        @JsonProperty("bairro")
        String bairro,

        @JsonProperty("estado")
        String estado,

        @JsonProperty("cidade")
        String cidade
){ }
package br.alertarisk.controllers.response.endereco;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SaveEnderecoResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("cep")
        String cep,

        @JsonProperty("rua")
        String rua,

        @JsonProperty("bairro")
        String bairro,

        @JsonProperty("estado")
        String estado
        ){ }

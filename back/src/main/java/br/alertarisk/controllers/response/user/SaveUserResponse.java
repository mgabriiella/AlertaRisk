package br.alertarisk.controllers.response.user;

import br.alertarisk.controllers.response.endereco.SaveEnderecoResponse;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;

public record SaveUserResponse(

        @JsonProperty("id")
        UUID id,
        @JsonProperty("name")
        String name,
        @JsonProperty("email")
        String email,
        @JsonProperty("password")
        String password,
        @JsonProperty("phone")
        String phone,
        List<SaveEnderecoResponse> enderecos
){}

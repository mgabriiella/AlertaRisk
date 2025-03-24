package br.alertarisk.controllers.response.user;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;

public record ListUserResponse(

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
        List<SaveEnderecoRequest> enderecos
){}

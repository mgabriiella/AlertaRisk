package br.alertarisk.controllers.request.user;

import br.alertarisk.controllers.response.endereco.ListEnderecoResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SaveUserRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @Email
        @JsonProperty("email")
        String email,
        @NotNull
        @JsonProperty("phone")
        String phone
        ){ }

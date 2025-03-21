package br.alertarisk.controllers.request.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @JsonProperty("email")
        String email,
        @NotNull
        @JsonProperty("phone")
        String phone
){}

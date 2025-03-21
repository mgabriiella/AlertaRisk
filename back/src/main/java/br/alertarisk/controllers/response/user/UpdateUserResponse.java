package br.alertarisk.controllers.response.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public record UpdateUserResponse(

        @JsonProperty("id")
        UUID id,
        @JsonProperty("name")
        String name,
        @JsonProperty("email")
        String email,
        @JsonProperty("phone")
        String phone
){}

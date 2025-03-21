package br.alertarisk.controllers.request.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record UpdateUserRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @Email(message = "o campo [email] deve conter um e-mail válido")
        @JsonProperty("email")
        String email,
        @NotNull
        @JsonProperty("phone")
        @Length(min = 11, max = 11,message = "O campo [phone] deve conter 11 caracteres")
        String phone
){}

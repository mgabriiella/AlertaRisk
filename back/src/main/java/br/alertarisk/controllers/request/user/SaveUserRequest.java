package br.alertarisk.controllers.request.user;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.response.endereco.ListEnderecoResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record SaveUserRequest(
        @NotNull
        @JsonProperty("name")
        String name,
        @NotNull
        @Email(message = "o campo [email] deve conter um e-mail válido")
        @JsonProperty("email")
        String email,
        @NotNull
        @JsonProperty("password")
        String password,
        @NotNull
        @JsonProperty("phone")
        @Length(min = 11, max = 14,message = "O campo [phone] deve conter no mínimo 11 caracteres")
        String phone,
        @NotNull
        List<SaveEnderecoRequest> enderecos
        ){ }

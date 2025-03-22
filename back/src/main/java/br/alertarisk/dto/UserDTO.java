package br.alertarisk.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstuctor;

public record UserDTO(
        @JsonProperty("id")
        UUID id,

        @NotNull
        @JsonProperty("name")
        String name,

        @NotNull
        @Email(message = "O campo [email] deve conter um e-mail válido")
        @JsonProperty("email")
        String email,

        @NotNull
        @JsonProperty("password")
        String password,

        @NotNull
        @JsonProperty("phone")
        @Length(min = 11, max = 11, message = "O campo [phone] deve conter 11 caracteres")
        String phone,

        @JsonProperty("cpf")
        String cpf,

        @JsonProperty("enderecos")
        Set<ListEnderecoResponse> enderecos,

        @JsonProperty("posts")
        Set<PostagemDTO> posts
) { }
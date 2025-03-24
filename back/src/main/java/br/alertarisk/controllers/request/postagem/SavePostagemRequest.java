package br.alertarisk.controllers.request.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record SavePostagemRequest(
        @NotNull
        @JsonProperty("comment")
        String comment,

        @NotNull
        @Email(message = "insira um e-mail válido")
        @JsonProperty("email_usuario")
        String emailUsuario,

        @NotNull
        @JsonProperty("id_endereco")
        Long idEndereco
) { }

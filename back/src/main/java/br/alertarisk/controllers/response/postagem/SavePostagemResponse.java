package br.alertarisk.controllers.response.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.response.user.UserDetailResponse;
import br.alertarisk.models.UserModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;

import java.time.LocalDateTime;

public record SavePostagemResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("created_at")
        LocalDateTime createdAt,

        @JsonProperty("comment")
        String comment,

//        @JsonProperty("media")
//        String media, // Mudança prevista para um outro DB

        @JsonProperty("email_usuario")
        @Email
        String emailUsuario,

        @JsonProperty("endereco")
        SaveEnderecoRequest endereco


) {
}
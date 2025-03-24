package br.alertarisk.controllers.response.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.response.user.UserDetailResponse;
import com.fasterxml.jackson.annotation.JsonProperty;

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
        UserDetailResponse emailUsuario,

        @JsonProperty("endereco")
        SaveEnderecoRequest endereco


) {
}
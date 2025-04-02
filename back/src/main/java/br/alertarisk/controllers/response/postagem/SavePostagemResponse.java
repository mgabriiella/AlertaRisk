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

        @JsonProperty("titulo")
        String titulo,

        @JsonProperty("conteudo")
        String conteudo,

        @JsonProperty("endereco")
        SaveEnderecoRequest endereco ,

        @JsonProperty("id_usuario")
        Long idUsuario


) {
}
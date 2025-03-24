package br.alertarisk.controllers.response.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.models.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record PostagemDetailResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("created_at")
        LocalDateTime createdAt,

        @JsonProperty("comment")
        String comment,

//        @JsonProperty("media")
//        String media, // Mudança prevista para um outro DB

        @JsonProperty("endereco")
        SaveEnderecoRequest endereco ,

        @JsonProperty("email_usuario")
        String emailUsuario
)
{}
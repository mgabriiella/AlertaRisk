package br.alertarisk.controllers.request.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.models.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record UpdatePostagemRequest(
//        @JsonProperty("created_at")
//        LocalDateTime createdAt,

        @NotNull
        @JsonProperty("comment")
        String comment

//        @JsonProperty("media")
//        String media, /


) { }
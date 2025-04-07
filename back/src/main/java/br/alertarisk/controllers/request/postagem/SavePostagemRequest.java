package br.alertarisk.controllers.request.postagem;

import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SavePostagemRequest(
        @NotNull
        @JsonProperty("categoria")
        CategoriaPostagem categoria,

        @NotNull
        @JsonProperty("titulo")
        String titulo,

        @NotNull
        @JsonProperty("conteudo")
        String conteudo,

        @JsonProperty("media")
        String media,

        @NotNull
        @JsonProperty("id_usuario")
        UUID idUsuario,

        @NotNull
        @JsonProperty("cep")
        String cep,

        @NotNull
        @JsonProperty("bairro")
        String bairro
) { }

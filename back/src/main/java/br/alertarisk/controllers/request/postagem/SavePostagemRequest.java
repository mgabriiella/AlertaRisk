package br.alertarisk.controllers.request.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.models.Alerta;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
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
        @JsonProperty("id_endereco")
        Long idEndereco,

        @NotNull
        @JsonProperty("alerta")
        Alerta alerta


) { }

package br.alertarisk.controllers.response.postagem;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record UpdatePostagemResponse(
        @NotNull
        @JsonProperty("id")
        Long id,

        @JsonProperty("created_at") //Talvez não seja mais necessaria
        LocalDateTime createdAt,

        @JsonProperty("update_at") // Atualiza a data para o momento da alteração
        LocalDateTime updateAt,

        @NotNull
        @JsonProperty("comment")
        String comment,

        @JsonProperty("media")
        String media, // Mudança prevista para um outro DB

        @NotNull
        @JsonProperty("id_endereco")
        Long idEndereco,

        @NotNull
        @JsonProperty("id_usuario")
        Long idUsuario
){
}
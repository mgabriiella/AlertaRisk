package br.alertarisk.controllers.response.postagem;

public record SavePostagemResponse(
        @NotNull
        @JsonProperty("id")
        Long id,

        @JsonProperty("created_at")
        LocalDateTime createdAt,

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
) {
}
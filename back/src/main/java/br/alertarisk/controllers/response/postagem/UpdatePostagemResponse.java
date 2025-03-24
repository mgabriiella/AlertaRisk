package br.alertarisk.controllers.response.postagem;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.models.Endereco;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

public record UpdatePostagemResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("created_at") //Talvez não seja mais necessaria
        LocalDateTime createdAt,

//        @JsonProperty("update_at") // Atualiza a data para o momento da alteração
//        LocalDateTime updateAt,

        @JsonProperty("comment")
        String comment

//        @JsonProperty("media")
//        String media,


){
}
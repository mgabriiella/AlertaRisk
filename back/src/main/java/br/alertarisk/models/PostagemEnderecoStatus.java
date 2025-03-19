package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "POSTAGEM_ENDERECO_STATUS")
public class PostagemEnderecoStatus {

    @EmbeddedId
    private IdPostagemEnderecoStatus id;

    @ManyToOne
    @MapsId("idPost")
    @JoinColumn(name = "id_post", nullable = false)
    private Postagem postagem;

    @ManyToOne
    @MapsId("idEndereco")
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;
}

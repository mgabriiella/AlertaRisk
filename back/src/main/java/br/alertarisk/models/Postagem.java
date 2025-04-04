package br.alertarisk.models;

import br.alertarisk.enums.CategoriaPostagem;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Data
@Table(name = "POSTAGEM")
public class Postagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_post")
    private Long id;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private CategoriaPostagem categoria;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "conteudo", nullable = false)
    private String conteudo;

    @Column
    private String media;

    @Column(name = "likes", nullable = false)
    private Long likes = 0L;

    @Column(name = "dislikes", nullable = false)
    private Long dislikes = 0L;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "usuario_id",nullable = false)
    private UserModel user;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_alerta")
    private Alerta alerta;

}

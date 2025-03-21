package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "POSTAGEM")
@Getter
@Setter
@ToString
public class Postagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_post")
    private Long id;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column
    private String comment;

    @Column
    private String media;

    @ManyToOne
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;

    @ManyToOne
    @JoinColumn(name = "id_usuario",nullable = false)
    private UserModel usuario;
}

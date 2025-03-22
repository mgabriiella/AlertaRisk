package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "ENDERECO")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,columnDefinition = "bpchar(8)")
    private String cep;

    @Column
    private String numero;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UserModel user;

    @OneToMany(mappedBy = "endereco", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Postagem> posts;
}

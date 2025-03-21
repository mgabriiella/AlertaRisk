package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Entity
@Data
@Table(name = "ENDERECO")
@Getter
@Setter
@ToString
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,columnDefinition = "bpchar(8)")
    private Long cep;

    @Column
    private Long numero;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UserModel usuario;

    @OneToMany(mappedBy = "endereco", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Postagem> posts;
}

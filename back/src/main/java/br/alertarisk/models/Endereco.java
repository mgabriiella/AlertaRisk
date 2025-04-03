package br.alertarisk.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Table(name = "ENDERECO")
@Getter
@Setter
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long id;

    @NotNull
    @Column(nullable = false,columnDefinition = "bpchar(8)")
    private String cep;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UserModel user;

    @OneToMany(mappedBy = "endereco", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Postagem> posts;

    @OneToMany(mappedBy = "endereco", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Alerta> alertas;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Endereco endereco = (Endereco) obj;
        return Objects.equals(id, endereco.id);
    }
}

package br.alertarisk.models;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Data
@Table(name = "ALERTA")
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alerta")
    private Long id;

    @Column
    @Enumerated(EnumType.STRING)
    private AlertaStatus status;

    @Column
    @Enumerated(EnumType.STRING)
    private CategoriaPostagem categoria;

    @Column
    @Enumerated(EnumType.STRING)
    private AlertaNivel nivel;

    @ManyToOne(cascade = CascadeType.ALL, fetch = LAZY)
    private Endereco endereco;

    @ManyToOne(cascade = CascadeType.ALL, fetch = LAZY)
    private Postagem post;

    // Relação com AlertaAtivo
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaAtivo> alertaAtivos;

    // Relação com AlertaEnderecoStatus
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaEnderecoStatus> alertaEnderecoStatus;

    // Relação com AlertaPostagemStatus
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaPostagemStatus> alertaPostagemStatus;
}

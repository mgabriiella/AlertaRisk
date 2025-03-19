package br.alertarisk.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
@Table(name = "ALERTA")
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alerta")
    private Long idAlerta;

    // Relação com AlertaAtivo
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaAtivo> alertaAtivos;

    // Relação com AlertaEnderecoStatus
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaEnderecoStatus> alertaEnderecoStatuses;

    // Relação com AlertaPostagemStatus
    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaPostagemStatus> alertaPostagemStatuses;
}

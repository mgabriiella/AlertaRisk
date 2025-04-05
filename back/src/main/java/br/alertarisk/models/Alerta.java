package br.alertarisk.models;

import br.alertarisk.enums.AlertaNivel;
import br.alertarisk.enums.AlertaStatus;
import br.alertarisk.enums.CategoriaPostagem;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
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
    @JsonManagedReference
    private Endereco endereco;

    @ManyToOne(cascade = CascadeType.ALL, fetch = LAZY)
    private Postagem post;

    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaAtivo> alertaAtivos;

    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaEnderecoStatus> alertaEnderecoStatus;

    @OneToMany(mappedBy = "alerta", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlertaPostagemStatus> alertaPostagemStatus;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "rain_volume")
    private Double rainVolume;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
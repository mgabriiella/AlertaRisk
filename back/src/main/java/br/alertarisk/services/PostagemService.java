package br.alertarisk.services;

import br.alertarisk.exception.NotFoundException;
import br.alertarisk.models.Postagem;
import br.alertarisk.repositories.PostagemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostagemService {

    private final PostagemRepository repository;

    public List<Postagem> findAll() {
        return repository.findAll();
    }

    public Postagem findById(final Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Postagem não encontrada")
        );
    }

    public Postagem save(final Postagem postagem) {
    return repository.save(postagem);
    }

    public Postagem update(final Postagem postagem) {
        Postagem existPost = repository.findById(postagem.getId()).orElseThrow(
                () -> new NotFoundException("Post não encontrado")
        );

        existPost.setComment(postagem.getComment());

        return repository.save(existPost);
    }

    public void delete(final Long id) {
        repository.findById(id);
        repository.deleteById(id);
    }
}

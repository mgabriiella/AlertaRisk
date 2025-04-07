package br.alertarisk.services;

import br.alertarisk.controllers.request.postagem.SavePostagemRequest;
import br.alertarisk.enums.CategoriaPostagem;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.models.Endereco;
import br.alertarisk.models.Postagem;
import br.alertarisk.models.UserModel;
import br.alertarisk.repositories.EnderecoRepository;
import br.alertarisk.repositories.PostagemRepository;
import br.alertarisk.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostagemService {

    private final PostagemRepository postagemRepository;
    private final EnderecoRepository enderecoRepository;
    private final UserRepository userRepository;

    public Postagem save(SavePostagemRequest request) {
        // Buscar o usuário pelo ID
        UserModel user = userRepository.findById(request.idUsuario())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado com o ID fornecido."));

        // Buscar o endereço pelo CEP e bairro
        Endereco endereco = enderecoRepository.findByCepAndBairro(request.cep(), request.bairro())
                .orElseThrow(() -> new NotFoundException("Endereço não encontrado para o CEP e bairro fornecidos."));

        // Criar a postagem
        Postagem postagem = new Postagem();
        postagem.setCategoria(request.categoria());
        postagem.setTitulo(request.titulo());
        postagem.setConteudo(request.conteudo());
        postagem.setMedia(request.media());
        postagem.setUser(user);
        postagem.setEndereco(endereco);
        postagem.setCreatedAt(LocalDateTime.now());
        postagem.setUpdatedAt(LocalDateTime.now());

        return postagemRepository.save(postagem);
    }

    public List<Postagem> list() {
        return postagemRepository.findAll();
    }

    public Postagem findById(final Long id) {
        return postagemRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Postagem não encontrada")
        );
    }

    public Postagem update(final Postagem postagem) {
        Postagem existPost = postagemRepository.findById(postagem.getId()).orElseThrow(
                () -> new NotFoundException("Post não encontrado")
        );

        existPost.setConteudo(postagem.getConteudo());
        existPost.setTitulo(postagem.getTitulo());
        existPost.setCategoria(postagem.getCategoria());
        existPost.setEndereco(postagem.getEndereco());

        return postagemRepository.save(existPost);
    }

    public void delete(final Long id) {
        postagemRepository.findById(id);
        postagemRepository.deleteById(id);
    }
}

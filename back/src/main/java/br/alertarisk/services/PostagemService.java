    package br.alertarisk.services;

    import br.alertarisk.controllers.request.postagem.SavePostagemRequest;
    import br.alertarisk.exception.NotFoundException;
    import br.alertarisk.exception.ValidationException;
    import br.alertarisk.models.Endereco;
    import br.alertarisk.models.Postagem;
    import br.alertarisk.models.UserModel;
    import br.alertarisk.repositories.EnderecoRepository;
    import br.alertarisk.repositories.PostagemRepository;
    import br.alertarisk.repositories.UserRepository;
    import jakarta.transaction.Transactional;
    import lombok.AllArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    @AllArgsConstructor
    public class PostagemService {

        private final PostagemRepository repository;

        private final EnderecoRepository enderecoRepository;

        private final UserRepository userRepository;


        private final AlertaService alertaService;

        public List<Postagem> list() {
            return repository.findAll();
        }

        public Postagem findById(final Long id) {
            return repository.findById(id).orElseThrow(
                    () -> new NotFoundException("Postagem não encontrada")
            );
        }

        @Transactional
        public Postagem save(final SavePostagemRequest request) {

            UserModel user = userRepository.findById(request.idUsuario())
                    .orElseThrow(() -> new NotFoundException("Usuário não encontrado com o ID " + request.idUsuario()));

            Endereco endereco = enderecoRepository.findById(request.idEndereco())
                    .orElseThrow(() -> new NotFoundException("Endereço não encontrado com ID: " + request.idEndereco()));

            if (!endereco.getUser().getId().equals(user.getId())) {
                throw new ValidationException("O endereço informado não pertence ao usuário.");
            }

            Postagem postagem = new Postagem();
            postagem.setCategoria(request.categoria());
            postagem.setTitulo(request.titulo());
            postagem.setConteudo(request.conteudo());
            postagem.setUser(user);
            postagem.setEndereco(endereco);

            return repository.save(postagem);
        }



        public Postagem update(final Postagem postagem) {
            Postagem existPost = repository.findById(postagem.getId()).orElseThrow(
                    () -> new NotFoundException("Post não encontrado")
            );

            existPost.setConteudo(postagem.getConteudo());
            existPost.setTitulo(postagem.getTitulo());
            existPost.setCategoria(postagem.getCategoria());
            existPost.setEndereco(postagem.getEndereco());


            return repository.save(existPost);
        }

        public void delete(final Long id) {
            repository.findById(id);
            repository.deleteById(id);
        }
    }

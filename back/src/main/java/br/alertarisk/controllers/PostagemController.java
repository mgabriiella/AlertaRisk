package br.alertarisk.controllers;

import br.alertarisk.controllers.request.postagem.SavePostagemRequest;
import br.alertarisk.controllers.request.postagem.UpdatePostagemRequest;
import br.alertarisk.controllers.response.postagem.ListPostagemResponse;
import br.alertarisk.controllers.response.postagem.PostagemDetailResponse;
import br.alertarisk.controllers.response.postagem.SavePostagemResponse;
import br.alertarisk.controllers.response.postagem.UpdatePostagemResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;

import br.alertarisk.mappers.PostagemMapper;
import br.alertarisk.services.PostagemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("posts")
@AllArgsConstructor
@Tag(name = "CRUD Postagens", description = "Operações para gerenciamento de postagens")
//@ApiResponses(value = {
//        @ApiResponse(responseCode = "200",description = "Requisição realizada com Sucesso"),
//        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
//        @ApiResponse(responseCode = "401", description = "Não autorizado"),
//        @ApiResponse(responseCode = "404", description = "Não encontrado"),
//        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
//})
public class PostagemController {

    private final PostagemService postagemService;
    private final PostagemMapper postagemMapper;

    @Operation(summary = "Veja uma lista com todos os postagens cadastrados no sistema")
    @GetMapping
    public List<ListPostagemResponse> list() {
        var postagens = postagemService.list();
        return postagemMapper.toListResponse(postagens);
    }

    @Operation(summary = "Veja um postagem cadastrado no sistema com o id específicado")
    @GetMapping("{id}")
    public PostagemDetailResponse findById(@PathVariable Long id) {
        var postagem = postagemService.findById(id);
        return postagemMapper.toDetailResponse(postagem);
    }
    @Operation(summary = "Adicione um postagem no sistema")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SavePostagemResponse save(@RequestBody @Valid SavePostagemRequest request) {
        var postagem = postagemService.save(request);
        return postagemMapper.toSaveResponse(postagem);
    }

    @Operation(summary = "Edite os dados de um postagem no sistema")
    @PutMapping("{id}")
    public UpdatePostagemResponse update(@PathVariable Long id, @RequestBody UpdatePostagemRequest request) {
        var postagem = postagemMapper.toModel(id, request);
        postagemService.update(postagem);
        return postagemMapper.toUpdateResponse(postagem);
    }

    @Operation(summary = "Remova um postagem no sistema")
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        postagemService.delete(id);
    }


}
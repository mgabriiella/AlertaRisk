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
public class PostagemController {

    private final PostagemService postagemService;
    private final PostagemMapper postagemMapper;

    @Operation(summary = "Listar todas as postagens", description = "Retorna uma lista de todas as postagens cadastradas no sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de postagens retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public List<ListPostagemResponse> list() {
        var postagens = postagemService.list();
        return postagemMapper.toListResponse(postagens);
    }

    @Operation(summary = "Buscar postagem por ID", description = "Retorna os detalhes de uma postagem específica.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Postagem encontrada"),
            @ApiResponse(responseCode = "404", description = "Postagem não encontrada")
    })
    @GetMapping("{id}")
    public PostagemDetailResponse findById(@PathVariable Long id) {
        var postagem = postagemService.findById(id);
        return postagemMapper.toDetailResponse(postagem);
    }

    @Operation(summary = "Criar uma nova postagem", description = "Adiciona uma nova postagem ao sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Postagem criada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SavePostagemResponse save(@RequestBody @Valid SavePostagemRequest request) {
        var postagem = postagemService.save(request);
        return postagemMapper.toSaveResponse(postagem);
    }

    @Operation(summary = "Atualizar uma postagem", description = "Atualiza os dados de uma postagem existente.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Postagem atualizada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Postagem não encontrada")
    })
    @PutMapping("{id}")
    public UpdatePostagemResponse update(@PathVariable Long id, @RequestBody UpdatePostagemRequest request) {
        var postagem = postagemMapper.toModel(id, request);
        postagemService.update(postagem);
        return postagemMapper.toUpdateResponse(postagem);
    }

    @Operation(summary = "Deletar uma postagem", description = "Remove uma postagem do sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Postagem removida com sucesso"),
            @ApiResponse(responseCode = "404", description = "Postagem não encontrada")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        postagemService.delete(id);
    }
}
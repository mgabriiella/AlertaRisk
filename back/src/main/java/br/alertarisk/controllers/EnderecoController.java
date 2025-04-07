package br.alertarisk.controllers;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.request.endereco.UpdateEnderecoRequest;
import br.alertarisk.controllers.response.endereco.EnderecoDetailResponse;
import br.alertarisk.controllers.response.endereco.ListEnderecoResponse;
import br.alertarisk.controllers.response.endereco.SaveEnderecoResponse;
import br.alertarisk.controllers.response.endereco.UpdateEnderecoResponse;
import br.alertarisk.mappers.EnderecoMapper;
import br.alertarisk.services.EnderecoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("enderecos")
@AllArgsConstructor
@Tag(name = "Endereços", description = "Operações para gerenciamento de endereços")
public class EnderecoController {

    private final EnderecoService service;
    private final EnderecoMapper mapper;

    @Operation(summary = "Listar todos os endereços", description = "Retorna uma lista de todos os endereços cadastrados no sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de endereços retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public List<ListEnderecoResponse> list() {
        var enderecos = service.list();
        return mapper.toListResponse(enderecos);
    }

    @Operation(summary = "Buscar endereço por ID", description = "Retorna os detalhes de um endereço específico.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Endereço encontrado"),
            @ApiResponse(responseCode = "404", description = "Endereço não encontrado")
    })
    @GetMapping("{id}")
    public EnderecoDetailResponse findById(@PathVariable Long id) {
        var endereco = service.findById(id);
        return mapper.toDetailResponse(endereco);
    }

    @Operation(summary = "Criar um novo endereço", description = "Adiciona um novo endereço ao sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Endereço criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping
    @ResponseStatus(CREATED)
    public SaveEnderecoResponse save(@RequestBody @Valid SaveEnderecoRequest request) {
        var endereco = mapper.toModel(request);
        service.save(endereco);
        return mapper.toSaveResponse(endereco);
    }

    @Operation(summary = "Atualizar um endereço", description = "Atualiza os dados de um endereço existente.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Endereço atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Endereço não encontrado")
    })
    @PutMapping("{id}")
    public UpdateEnderecoResponse update(@PathVariable Long id, @RequestBody @Valid UpdateEnderecoRequest request) {
        var endereco = mapper.toModel(id, request);
        service.update(endereco);
        return mapper.toUpdateResponse(endereco);
    }

    @Operation(summary = "Deletar um endereço", description = "Remove um endereço do sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Endereço removido com sucesso"),
            @ApiResponse(responseCode = "404", description = "Endereço não encontrado")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

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
@Tag(name = "CRUD Endereços", description = "Operações para gerenciamento de endereços")
//@ApiResponses(value = {
//        @ApiResponse(responseCode = "200",description = "Requisição realizada com Sucesso"),
//        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
//        @ApiResponse(responseCode = "401", description = "Não autorizado"),
//        @ApiResponse(responseCode = "404", description = "Não encontrado"),
//        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
//})
public class EnderecoController {
    private final EnderecoService service;
    private final EnderecoMapper mapper;

    @Operation(summary = "Veja uma lista com todos os endereços cadastrados no sistema")
    @GetMapping
    List<ListEnderecoResponse> list() {
        var enderecos = service.list();
        return mapper.toListResponse(enderecos);
    }

    @Operation(summary = "Veja um endereço cadastrado no sistema com o id específicado")
    @GetMapping("{id}")
    EnderecoDetailResponse findById(@PathVariable Long id) {
        var endereco = service.findById(id);
        return mapper.toDetailResponse(endereco);
    }

    @Operation(summary = "Adicione um endereço no sistema")
    @PostMapping
    @ResponseStatus(CREATED)
    SaveEnderecoResponse save(@RequestBody @Valid final SaveEnderecoRequest request){
        var endereco = mapper.toModel(request);
        service.save(endereco);
        return mapper.toSaveResponse(endereco);
    }

    @Operation(summary = "Edite os dados de um endereço no sistema")
    @PutMapping("{id}")
    UpdateEnderecoResponse update(@PathVariable final Long id, @RequestBody final UpdateEnderecoRequest request){
        var endereco = mapper.toModel(id,request);
        service.update(endereco);
        return mapper.toUpdateResponse(endereco);
    }

    @Operation(summary = "Remova um endereço no sistema")
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final Long id){
        service.delete(id);
    }


}

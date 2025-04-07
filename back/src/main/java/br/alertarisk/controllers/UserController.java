package br.alertarisk.controllers;

import br.alertarisk.controllers.request.user.SaveUserRequest;
import br.alertarisk.controllers.request.user.UpdateUserRequest;
import br.alertarisk.controllers.response.user.ListUserResponse;
import br.alertarisk.controllers.response.user.SaveUserResponse;
import br.alertarisk.controllers.response.user.UpdateUserResponse;
import br.alertarisk.controllers.response.user.UserDetailResponse;
import br.alertarisk.mappers.UserMapper;
import br.alertarisk.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@Tag(name = "Usuários", description = "Operações para gerenciamento de usuários")
public class UserController {

    private final UserService service;
    private final UserMapper mapper;

    @Operation(summary = "Listar todos os usuários", description = "Retorna uma lista de todos os usuários cadastrados no sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public List<ListUserResponse> list() {
        var users = service.list();
        return mapper.toListResponse(users);
    }

    @Operation(summary = "Buscar usuário por ID", description = "Retorna os detalhes de um usuário específico.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @GetMapping("{id}")
    public UserDetailResponse findById(@PathVariable UUID id) {
        var user = service.findById(id);
        return mapper.toDetailResponse(user);
    }

    @Operation(summary = "Criar um novo usuário", description = "Adiciona um novo usuário ao sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida")
    })
    @PostMapping
    @ResponseStatus(CREATED)
    public SaveUserResponse save(@RequestBody @Valid SaveUserRequest request) {
        var user = mapper.toModel(request);
        service.save(user);
        return mapper.toSaveResponse(user);
    }

    @Operation(summary = "Atualizar um usuário", description = "Atualiza os dados de um usuário existente.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @PutMapping("{id}")
    public UpdateUserResponse update(@PathVariable UUID id, @RequestBody @Valid UpdateUserRequest request) {
        var user = mapper.toModel(id, request);
        service.update(user);
        return mapper.toUpdateResponse(user);
    }

    @Operation(summary = "Deletar um usuário", description = "Remove um usuário do sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuário removido com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}

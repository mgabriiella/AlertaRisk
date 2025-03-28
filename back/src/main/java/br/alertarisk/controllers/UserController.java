package br.alertarisk.controllers;

import br.alertarisk.controllers.request.user.SaveUserRequest;
import br.alertarisk.controllers.request.user.UpdateUserRequest;
import br.alertarisk.controllers.response.user.ListUserResponse;
import br.alertarisk.controllers.response.user.SaveUserResponse;
import br.alertarisk.controllers.response.user.UpdateUserResponse;
import br.alertarisk.controllers.response.user.UserDetailResponse;
import br.alertarisk.mappers.UserMapper;
import br.alertarisk.models.UserModel;
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
@Tag(name = "CRUD Usuários", description = "Operações para gerenciamento de usuários")
//@ApiResponses(value = {
//        @ApiResponse(responseCode = "200",description = "Requisição realizada com Sucesso"),
//        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
//        @ApiResponse(responseCode = "401", description = "Não autorizado"),
//        @ApiResponse(responseCode = "404", description = "Não encontrado"),
//        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
//})
public class UserController {

    private final UserService service;
    private final UserMapper mapper;

    @Operation(summary = "Veja uma lista com todos os usuários cadastrados no sistema")
    @GetMapping
    List<ListUserResponse> list() {
        var users = service.list();
        return mapper.toListResponse(users);
    }

    @Operation(summary = "Veja um usuário cadastrado no sistema com o id específicado")
    @GetMapping("{id}")
    UserDetailResponse findById(@PathVariable UUID id) {
        var user = service.findById(id);
        return mapper.toDetailResponse(user);
    }

    @Operation(summary = "Adicione um usuário no sistema")
    @PostMapping
    @ResponseStatus(CREATED)
    SaveUserResponse save(@RequestBody @Valid final SaveUserRequest request){
        var user = mapper.toModel(request);
        service.save(user);
        return mapper.toSaveResponse(user);
    }

    @Operation(summary = "Edite os dados de um usuário no sistema")
    @PutMapping("{id}")
    UpdateUserResponse update(@PathVariable final UUID id, @RequestBody @Valid final UpdateUserRequest request){
        var user = mapper.toModel(id,request);
        service.update(user);
        return mapper.toUpdateResponse(user);
    }

    @Operation(summary = "Remova um usuário no sistema")
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final UUID id){
        service.delete(id);
    }


}

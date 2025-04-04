package br.alertarisk.controllers;

import br.alertarisk.dto.AuthUserDTO;
import br.alertarisk.security.AuthUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
@Tag(name = "Autenticação de Usuários", description = "Operação para autenticar usuários existentes no sistema")
//@ApiResponses(value = {
//        @ApiResponse(responseCode = "200",description = "Requisição realizada com Sucesso"),
//        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
//        @ApiResponse(responseCode = "401", description = "Não autorizado"),
//        @ApiResponse(responseCode = "404", description = "Não encontrado"),
//        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
//})
public class AuthUserController {

    private AuthUser authUser;

    @Operation(summary = "Gere um token com as credenciais de um usuário existente no sistema")
    @PostMapping
    @ResponseStatus(CREATED)
    public ResponseEntity<Object> create(@RequestBody final AuthUserDTO authUserDTO) {
        try {
            var result = authUser.execute(authUserDTO);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(UNAUTHORIZED).body(e.getMessage());
        }
    }
}

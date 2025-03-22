package br.alertarisk.controllers;

import br.alertarisk.dto.AuthUserDTO;
import br.alertarisk.security.AuthUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthUserController {

    private AuthUser authUser;


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

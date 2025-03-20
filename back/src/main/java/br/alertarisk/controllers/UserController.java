package br.alertarisk.controllers;

import br.alertarisk.controllers.request.SaveUserRequest;
import br.alertarisk.controllers.request.UpdateUserRequest;
import br.alertarisk.controllers.response.ListUserResponse;
import br.alertarisk.controllers.response.SaveUserResponse;
import br.alertarisk.controllers.response.UpdateUserResponse;
import br.alertarisk.controllers.response.UserDetailResponse;
import br.alertarisk.mappers.UserMapper;
import br.alertarisk.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UserController {
    private final UserService service;
    private final UserMapper mapper;

    @GetMapping
    List<ListUserResponse> list() {
        var users = service.list();
        return mapper.toListResponse(users);
    }

    @GetMapping("{id}")
    UserDetailResponse findById(@PathVariable UUID id) {
        var user = service.findById(id);
        return mapper.toDetailResponse(user);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    SaveUserResponse save(@RequestBody @Valid final SaveUserRequest request){
        var user = mapper.toModel(request);
        service.save(user);
        return mapper.toSaveResponse(user);
    }

    @PutMapping("{id}")
    UpdateUserResponse update(@PathVariable final UUID id, @RequestBody @Valid final UpdateUserRequest request){
        var user = mapper.toModel(id,request);
        service.update(user);
        return mapper.toUpdateResponse(user);
    }
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final UUID id){
        service.delete(id);
    }


}

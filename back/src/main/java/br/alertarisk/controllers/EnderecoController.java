package br.alertarisk.controllers;

import br.alertarisk.controllers.request.endereco.SaveEnderecoRequest;
import br.alertarisk.controllers.request.endereco.UpdateEnderecoRequest;
import br.alertarisk.controllers.response.endereco.EnderecoDetailResponse;
import br.alertarisk.controllers.response.endereco.ListEnderecoResponse;
import br.alertarisk.controllers.response.endereco.SaveEnderecoResponse;
import br.alertarisk.controllers.response.endereco.UpdateEnderecoResponse;
import br.alertarisk.mappers.EnderecoMapper;
import br.alertarisk.services.EnderecoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("enderecos")
@AllArgsConstructor
public class EnderecoController {
    private final EnderecoService service;
    private final EnderecoMapper mapper;

    @GetMapping
    List<ListEnderecoResponse> list() {
        var enderecos = service.list();
        return mapper.toListResponse(enderecos);
    }

    @GetMapping("{id}")
    EnderecoDetailResponse findById(@PathVariable Long id) {
        var endereco = service.findById(id);
        return mapper.toDetailResponse(endereco);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    SaveEnderecoResponse save(@RequestBody @Valid final SaveEnderecoRequest request){
        var endereco = mapper.toModel(request);
        service.save(endereco);
        return mapper.toSaveResponse(endereco);
    }

    @PutMapping("{id}")
    UpdateEnderecoResponse update(@PathVariable final Long id, @RequestBody final UpdateEnderecoRequest request){
        var endereco = mapper.toModel(id,request);
        service.update(endereco);
        return mapper.toUpdateResponse(endereco);
    }
    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final Long id){
        service.delete(id);
    }


}

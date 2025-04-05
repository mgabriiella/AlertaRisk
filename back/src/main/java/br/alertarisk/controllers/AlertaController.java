package br.alertarisk.controllers;

import br.alertarisk.controllers.request.alerta.SaveAlertaRequest;
import br.alertarisk.controllers.request.alerta.UpdateAlertaRequest;
import br.alertarisk.controllers.response.alerta.DetailAlertaResponse;
import br.alertarisk.controllers.response.alerta.ListAlertaResponse;
import br.alertarisk.controllers.response.alerta.SaveAlertaResponse;
import br.alertarisk.controllers.response.alerta.UpdateAlertaResponse;
import br.alertarisk.mappers.AlertaMapper;
import br.alertarisk.services.alerta.AlertaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("alertas")
@AllArgsConstructor
public class AlertaController {

    private final AlertaService alertaService;

    private final AlertaMapper alertaMapper;

    @GetMapping
    public List<ListAlertaResponse> list() {
        var alertas = alertaService.list();
        return alertaMapper.toListResponse(alertas);
    }

    @GetMapping("{id}")
    public DetailAlertaResponse findById(@PathVariable Long id) {
        var alerta = alertaService.findById(id);
        return alertaMapper.toDetailResponse(alerta);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    SaveAlertaResponse save(@RequestBody @Valid final SaveAlertaRequest request) {
        var alerta = alertaMapper.toModel(request);
        alertaService.save(alerta);
        return alertaMapper.toSaveResponse(alerta);
    }

    @PutMapping("{id}")
    UpdateAlertaResponse update(@PathVariable Long id, @RequestBody @Valid final UpdateAlertaRequest request) {
        var alerta = alertaMapper.toModel(id,request);
        alertaService.save(alerta);
        return alertaMapper.toUpdateResponse(alerta);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    void delete(@PathVariable final Long id) {
        alertaService.delete(id);
    }
}

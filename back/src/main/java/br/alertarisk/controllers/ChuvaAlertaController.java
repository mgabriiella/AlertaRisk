package br.alertarisk.controllers;


import br.alertarisk.controllers.response.alerta.DetailAlertaResponse;
import br.alertarisk.mappers.AlertaMapper;
import br.alertarisk.models.Alerta;
import br.alertarisk.services.alerta.ChuvaAlertaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("alertas/chuva")
@RequiredArgsConstructor
@Tag(name = "Alertas de Chuva", description = "Operações para gerenciamento de alertas de chuva")
public class ChuvaAlertaController {

    private final ChuvaAlertaService chuvaAlertaService;
    private final AlertaMapper alertaMapper;

    @Operation(summary = "Listar alertas de chuva", description = "Retorna uma lista de alertas de chuva com base nos dados da API.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de alertas retornada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public List<DetailAlertaResponse> getRainingAlerts() {
        List<Alerta> alerts = chuvaAlertaService.fetchAndCreateAlerts();
        return alerts.stream()
                .map(alertaMapper::toDetailResponse)
                .collect(Collectors.toList());
    }
}

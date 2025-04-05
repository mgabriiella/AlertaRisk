package br.alertarisk.controllers;


import br.alertarisk.models.Alerta;
import br.alertarisk.services.alerta.ChuvaAlertaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("alertas/chuva")
public class ChuvaAlertaController {

        private final ChuvaAlertaService chuvaAlertaService;

        @GetMapping
        public List<Alerta> getRainingAlerts() {
            return chuvaAlertaService.fetchAndSaveChuvaAlertas();
        }
    }


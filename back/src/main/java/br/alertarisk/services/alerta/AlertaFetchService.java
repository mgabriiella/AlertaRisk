package br.alertarisk.services.alerta;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AlertaFetchService {

        private final AlertaService alertaService;


        @Scheduled(fixedRate = 3600000)
        public void fetchAndMergeAlerts() {
            alertaService.newAlert();
        }

}
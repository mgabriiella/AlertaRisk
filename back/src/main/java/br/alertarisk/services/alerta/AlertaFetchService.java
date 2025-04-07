package br.alertarisk.services.alerta;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AlertaFetchService {

    private final ChuvaAlertaService chuvaAlertaService;
    private final AlertaMergeService alertaMergeService;

    @Scheduled(fixedRate = 3600000)
    public void fetchAndCreateSignificantRainAlerts() {
        chuvaAlertaService.fetchAndCreateAlerts();
    }

    @Scheduled(fixedRate = 3600000)
    public void fetchAndMergeAllAlerts() {
        alertaMergeService.mergeAndSaveApiAlerts();
    }
}
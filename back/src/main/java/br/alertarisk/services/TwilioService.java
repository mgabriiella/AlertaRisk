package br.alertarisk.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initTwilio() {
        // Inicializa o Twilio após as propriedades serem carregadas
        Twilio.init(accountSid, authToken);
    }

    public void sendAlertMessage(String endereco, String categoria, String nivel, String createdAt, String toPhoneNumber) {
        String messageBody = String.format(
                "🚨 Alerta de Risco 🚨\n\n" +
                        "📍 Endereço: %s\n" +
                        "📂 Categoria: %s\n" +
                        "⚠️ Nível: %s\n" +
                        "🕒 Criado em: %s\n\n" +
                        "Por favor, tome as devidas precauções.",
                endereco, categoria, nivel, createdAt
        );

        Message message = Message.creator(
                new PhoneNumber("whatsapp:" + toPhoneNumber.trim()),
                new PhoneNumber("whatsapp:" + twilioPhoneNumber),
                messageBody
        )
        .create();

        System.out.println("Mensagem enviada com sucesso! SID: " + message.getSid());
    }
}
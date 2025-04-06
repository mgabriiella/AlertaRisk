package br.alertarisk.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration // Indica que esta classe contém configurações do Spring
public class CorsConfig {

    // Injeta a URL do front end definida via propriedade 'app.frontend.url'
    // Essa propriedade pode ser definida no application.properties ou via variável de ambiente APP_FRONTEND_URL
    @Value("${app.frontend.url}")
    private String frontEndUrl;

    // Define um bean para o filtro de CORS, que configura as regras de Cross-Origin Resource Sharing
    @Bean
    public CorsFilter corsFilter() {
        // Cria uma nova instância de configuração de CORS
        CorsConfiguration config = new CorsConfiguration();

        // Permite requisições provenientes da URL definida para o front end
        config.addAllowedOrigin(frontEndUrl);
        config.addAllowedOrigin(frontEndUrl + "/**");

        // Permite todos os cabeçalhos nas requisições
        config.addAllowedHeader("*");

        // Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
        config.addAllowedMethod("*");

        // Permite o envio de credenciais (cookies, cabeçalhos de autenticação, etc.)
        config.setAllowCredentials(true);

        // Cria uma fonte de configuração que mapeia as configurações para padrões de URL
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Aplica as configurações de CORS para todas as rotas (/**)
        source.registerCorsConfiguration("/**", config);

        // Retorna o filtro de CORS configurado, que será aplicado a todas as requisições
        return new CorsFilter(source);
    }
}

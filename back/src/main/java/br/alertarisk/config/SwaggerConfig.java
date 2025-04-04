package br.alertarisk.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${swagger.server.url}")
    private String swaggerUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addSecurityItem( new SecurityRequirement()
                        .addList("Bearer Auth"))
                .components(new Components().addSecuritySchemes
                        ("Bearer Auth", createAPIKeyScheme()))
                .info(new Info()
                        .title("Documentação de API")
                        .version("1.0")
                        .description("Documentação da API do projeto AlertaRisk"))
                .servers(List.of(
                        new Server()
                                .url(swaggerUrl)
                                .description("Servidor Local de Testes")));
    }

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }
}

package br.alertarisk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import br.alertarisk.security.SecurityFilter;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

        private SecurityFilter securityFilter;

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http.csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(
            auth -> {
                        auth
                            .requestMatchers(HttpMethod.POST, "/users").permitAll()
                            .requestMatchers("/users").permitAll()
                            .requestMatchers("/users/**").permitAll()
                            .requestMatchers("/auth").permitAll()
                            .requestMatchers("/swagger-ui/**", "/v3/api-docs*/**").permitAll()
                            .anyRequest().authenticated();
            })
                            .addFilterBefore(securityFilter, BasicAuthenticationFilter.class)
            ;
            return http.build();

        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
}

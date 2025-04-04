package br.alertarisk.security;

import br.alertarisk.dto.AuthUserDTO;
import br.alertarisk.exception.AuthException;
import br.alertarisk.exception.NotFoundException;
import br.alertarisk.repositories.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthUser {

    @Value("${security.token.secret}")
    private String secret;

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;


    public String execute(AuthUserDTO authUser) {
        var auth = repository.findByEmail(authUser.getEmail()).orElseThrow(
                () -> new NotFoundException("Email não encontrado")
        );
        var passMatch = passwordEncoder.matches(authUser.getPassword(), auth.getPassword());

        if (!passMatch) {
            throw new AuthException("Senha incorreta");
        }
        Algorithm algorithm = Algorithm.HMAC256(secret);
        var token = JWT.create().withIssuer("AlertaRisk")
                .withExpiresAt(Instant.now().plus(Duration.ofHours(2)))
                .withSubject(auth.getId().toString())
                .sign(algorithm);
        return token;
    }
}

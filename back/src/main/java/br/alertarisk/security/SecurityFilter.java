package br.alertarisk.security;

import br.alertarisk.services.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.aspectj.apache.bcel.generic.RET;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

@Component
@AllArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private JWTService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if(header != null) {
            var subjectToken = jwtService.ValidateToken(header);
            if(subjectToken.isEmpty()) {
                response.setStatus(SC_UNAUTHORIZED);
                return;
            }
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(subjectToken,null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(auth);

        }

        filterChain.doFilter(request,response);

    }
}

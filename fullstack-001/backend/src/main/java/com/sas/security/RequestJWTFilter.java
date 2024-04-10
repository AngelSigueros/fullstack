package com.sas.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Base64;

/*
    - Interceptar peticiones Http
    - Extraer token JWT
    - Verificar token
    - Extraer usuario del token
 */

@Component
@Slf4j
public class RequestJWTFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info("RequestJWTFilter - Ejecutando filtro JWT");

        // Extraer Authorization de la cabecera Http
        String bearerToken = request.getHeader("Authorization");
        String token = "";
        if (StringUtils.hasLength(bearerToken) && bearerToken.startsWith("Bearer")) {// No nulo y vacio
            //token = bearerToken.substring("Bearer ".length());
            token = bearerToken.split(" ")[1];
        } else {
            filterChain.doFilter(request, response);
            return;
        }

        log.info("Token JWT extraido {}", token);

        // Verificar token
        byte[] key = Base64.getDecoder().decode("FZD5maIaX04mYCwsgckoBh1NJp6T3t62h2MVyEtdo3w=");
        String userId = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

        log.info("Id de usuario " + userId);

        // Dejar pasar la peticion para q continue
        filterChain.doFilter(request, response);
    }
}

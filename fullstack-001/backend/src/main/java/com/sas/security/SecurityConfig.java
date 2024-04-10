package com.sas.security;

import com.sas.model.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final RequestJWTFilter jwtFilter;

    public SecurityConfig(RequestJWTFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    /*
    Personalizar el objeto HttpSecurity de Spring para utilizar nuestro filtro JWT
    y proteger controladores
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // Para las nuevas versiones de Spring > 6.1
//        http
//            .csrf(csrf -> csrf.disable())
//            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
//                    .requestMatchers("/users/login").permitAll()
//                    .requestMatchers("/users/register").permitAll()
//                    .anyRequest().authenticated()
//            ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//            .build();

        // Versiones anteriores a Spring 6.1
        // Sin estados, sin sesiones Http ya q usamos token jwt
        // Jwt es sin estados y no depende de sesiones o cookies
        http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // proteger rutas
        http.authorizeHttpRequests()
                .requestMatchers("api/users/login").permitAll()
                .requestMatchers("api/users/register").permitAll()
                //.requestMatchers("api/books").hasAuthority(Role.ADMIN.name())
                .requestMatchers(HttpMethod.POST, "api/books").hasAuthority(Role.ADMIN.name())
                .anyRequest().authenticated();

        // asignar nuestro filtro personalizado de Jwt
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

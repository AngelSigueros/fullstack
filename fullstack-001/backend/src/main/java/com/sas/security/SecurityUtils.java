package com.sas.security;

import com.sas.model.User;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityUtils {

    /**
     * Devuelve user autenticado de Spring Security
     * @return
     */
    public static Optional<User> getCurrentUser() {

        Object pricipal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (pricipal instanceof User user) {
            return Optional.of(user);
        }
        return Optional.empty();
    }
}

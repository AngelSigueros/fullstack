package com.sas.security;

import com.sas.model.Role;
import com.sas.model.User;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityUtils {

    private SecurityUtils(){}

    /**
     * Devuelve user autenticado de Spring Security
     * @return
     */
    public static Optional<User> getCurrentUser() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User user) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public static boolean isAdminCurrentUser() {

        if (getCurrentUser().isEmpty()) {
            return false;
        }

        User user = getCurrentUser().get();
        return user.getRole().equals(Role.ADMIN);
    }
}

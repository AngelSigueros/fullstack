package com.sas;

import com.sas.model.Role;
import com.sas.model.User;
import com.sas.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

        ApplicationContext context = SpringApplication.run(BackendApplication.class, args);

        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
        UserRepository userRepository = context.getBean(UserRepository.class);

        User u1 = User.builder()
                .email("user1@sas.es")
                .name("admin")
                .password(passwordEncoder.encode("12345678"))
                .role(Role.ADMIN)
                .build();

        User u2 = User.builder()
                .email("user2@sas.es")
                .name("user")
                .password(passwordEncoder.encode("12345678"))
                .role(Role.USER)
                .build();

        User u3 = User.builder()
                .email("admin@gmail.com")
                .name("admin")
                .password(passwordEncoder.encode("12345678"))
                .role(Role.ADMIN)
                .build();

        User u4 = User.builder()
                .email("user@gmail.com")
                .name("user")
                .password(passwordEncoder.encode("12345678"))
                .role(Role.USER)
                .build();

        userRepository.saveAll(List.of(u1, u2, u3, u4));
    }

}

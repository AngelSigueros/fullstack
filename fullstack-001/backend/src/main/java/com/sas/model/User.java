package com.sas.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "b_user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    // private Boolean active;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
}
package com.sas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "b_user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    // private Boolean active;
    @JsonIgnore
    private String password;
    private String lastName;
    private String street;
    private String photoUrl;
    @Enumerated(EnumType.STRING)
    private Role role;
}
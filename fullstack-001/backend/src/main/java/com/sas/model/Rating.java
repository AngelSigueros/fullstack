package com.sas.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    @Column(length = 1000)
    private String comment;

    @ManyToOne
    private Book book;

    @ManyToOne
    private User user;
}

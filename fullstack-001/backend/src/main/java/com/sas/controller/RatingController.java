package com.sas.controller;

import com.sas.model.Rating;
import com.sas.repository.RatingRepository;
import com.sas.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*") // Permitir acceso desde cualquier dominio desde el exterior
@RestController
@AllArgsConstructor
@Slf4j
public class RatingController {


    private RatingRepository repo;

    @GetMapping("ratings/filter-by-book/{id}")
    public List<Rating> findAllByBookId(@PathVariable Long id) {
        return this.repo.findByBook_Id(id);
    }

    @PostMapping("ratings")
    public Rating create(@RequestBody() Rating rating) {
        // asignar el usuario autenticado antes de guardar el rating
        SecurityUtils.getCurrentUser().ifPresent(user-> rating.setUser(user));
        // SecurityUtils.getCurrentUser().ifPresent(rating::setUser);
        return this.repo.save(rating);
    }

}

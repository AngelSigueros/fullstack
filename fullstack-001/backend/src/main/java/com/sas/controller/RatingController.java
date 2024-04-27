package com.sas.controller;

import com.sas.exception.UnauthorizedException;
import com.sas.model.Rating;
import com.sas.model.Role;
import com.sas.model.User;
import com.sas.repository.RatingRepository;
import com.sas.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

        // si ya tiene rating en ese book no puede hacer rating otra vez
        //boolean existPevoiusRating = this.repo.existsByUserIdAndBookId(userId, book.id);

        // asignar el usuario autenticado antes de guardar el rating
        SecurityUtils.getCurrentUser().ifPresent(user-> rating.setUser(user));
        // SecurityUtils.getCurrentUser().ifPresent(rating::setUser);
        return this.repo.save(rating);
    }

    @DeleteMapping("ratings/{id}")
    public void deleteById(@PathVariable Long id) {

        Rating rating = this.repo.findById(id).orElseThrow();
        User user = SecurityUtils.getCurrentUser().orElseThrow();

        if(user.getRole().equals(Role.ADMIN) ||
                (rating.getUser() != null && rating.getUser().getId().equals(user.getId()))
        )
            this.repo.deleteById(id);
        else {
            throw new UnauthorizedException("No puede borrar el rating");
        }

    }


//    @DeleteMapping("ratings/{id}")
//    public void deleteById(@PathVariable Long id) {
//
//        if (SecurityUtils.isAdminCurrentUser()) {
//            this.repo.deleteById(id);
//            return;
//        }
//
//        Optional<Rating> ratingOpt = this.repo.findById(id);
//        if (ratingOpt.isEmpty())
//            return;
//
//        Rating rating = ratingOpt.get();
//
//        Optional<User> userOpt = SecurityUtils.getCurrentUser();
//        if (userOpt.isEmpty())
//            return;
//
//        User user = userOpt.get();
//
//        if(rating.getUser().getId().equals(user.getId()))
//            this.repo.deleteById(id);
//
//    }
}

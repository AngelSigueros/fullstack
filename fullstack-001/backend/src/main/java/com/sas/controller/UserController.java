package com.sas.controller;

import com.sas.dto.Register;
import com.sas.model.User;
import com.sas.repository.UserRepository;
import com.sas.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;



@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return userRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<User> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return userRepo.findAll();
    }



    @PostMapping()
    public User saveUser(@RequestBody User user) {
        log.info(this.getClass().getName() +" - saveUser");
        // Todo
        return userRepo.save(user);
    }


    @PutMapping("/{id}")
    public User updateUser(@RequestBody User user,@PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateUser " + id);
        // ToDo
        if (this.userRepo.existsById(id))
            return userRepo.save(user);
        else
            throw new NoSuchElementException();
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - deleteUser "+ id);
        userRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        userRepo.deleteAll();
    }


    @PostMapping("/register")
    public void register(@RequestBody Register register) {
        if (this.userRepo.existsByEmail(register.email())) {
            throw new RuntimeException("Email ocupado");
        }

        User user = new User(null, null, register.email(), register.password());
        this.userRepo.save(user);

    }
}















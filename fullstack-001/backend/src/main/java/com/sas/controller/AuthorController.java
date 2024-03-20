package com.sas.controller;

import com.sas.model.Author;
import com.sas.repository.AuthorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepository authorRepo;

    public AuthorController(AuthorRepository authorRepo) {
        this.authorRepo = authorRepo;
    }

    @GetMapping("/{id}")
    public Author findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return authorRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Author> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return authorRepo.findAll();
    }



    @PostMapping()
    public Author saveAuthor(@RequestBody Author author) {
        log.info(this.getClass().getName() +" - saveAuthor");
        // Todo
        return authorRepo.save(author);
    }


    @PutMapping("/{id}")
    public Author updateAuthor(@RequestBody Author author,@PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateAuthor " + id);
        // ToDo
        if (this.authorRepo.existsById(id))
            return authorRepo.save(author);
        else
            throw new NoSuchElementException();
    }


    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - deleteAuthor "+ id);
        authorRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        authorRepo.deleteAll();
    }
}

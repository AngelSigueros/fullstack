package com.sas.controller;

import com.sas.model.Author;
import com.sas.repository.AuthorRepository;
import com.sas.service.FileService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/authors")
public class AuthorController {

    private AuthorRepository authorRepo;
    private FileService fileService;
    @GetMapping("/{id}")
    public Author findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return this.authorRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Author> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return this.authorRepo.findAll();
    }

    @PostMapping()
    public Author create(
            @RequestParam(value = "photo", required = false) MultipartFile file,
            Author author){

        if(file != null && !file.isEmpty()) {
            String fileName = fileService.store(file);
            author.setPhotoUrl(fileName);
        } else {
            author.setPhotoUrl("/uploads/avatar.png");
        }

        return this.authorRepo.save(author);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Author> update(
            @PathVariable Long id,
            Author author,
            @RequestParam(value = "photo", required = false) MultipartFile file
    ){
        if(!this.authorRepo.existsById(id))
            return ResponseEntity.notFound().build();

        if(file != null && !file.isEmpty()) {
            String fileName = fileService.store(file);
            author.setPhotoUrl(fileName);
        }
        return ResponseEntity.ok(this.authorRepo.save(author));
    }

//    @PostMapping()
//    public Author saveAuthor(@RequestBody Author author) {
//        log.info(this.getClass().getName() +" - saveAuthor");
//        // Todo
//        return authorRepo.save(author);
//    }
//
//
//    @PutMapping("/{id}")
//    public Author updateAuthor(@RequestBody Author author,@PathVariable Long id) {
//        log.info(this.getClass().getName() + " - updateAuthor " + id);
//        // ToDo
//        if (this.authorRepo.existsById(id))
//            return authorRepo.save(author);
//        else
//            throw new NoSuchElementException();
//    }


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

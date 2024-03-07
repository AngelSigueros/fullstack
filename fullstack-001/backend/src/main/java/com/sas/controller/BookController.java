package com.sas.controller;

import com.sas.model.Book;
import com.sas.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200/")
@Slf4j
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepo;

    public BookController(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return bookRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Book> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return bookRepo.findAll();
    }


    @PostMapping()
    public Book saveBook(@RequestBody Book book) {
        log.info(this.getClass().getName() +" - saveBook");
        // Todo
        return bookRepo.save(book);
    }


    @PutMapping("/{id}")
    public Book updateBook(@RequestBody Book book,@PathVariable Long id) {
        log.info(this.getClass().getName() +" - updateBook "+ id);
        // ToDo
        return bookRepo.save(book);
    }


    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - deleteBook "+ id);
        bookRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        bookRepo.deleteAll();
    }
}

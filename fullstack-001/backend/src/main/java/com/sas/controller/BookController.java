package com.sas.controller;

import com.sas.model.Book;
import com.sas.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")
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


    @GetMapping("/isbn/{isbn}")
    public Book findByIsbn(@PathVariable Long isbn) {
        log.info(this.getClass().getName() +" - findByIsbn "+ isbn);
        return bookRepo.findById(isbn).orElseThrow();
    }


    @PostMapping()
    public Book saveBook(@RequestBody Book book) {
        log.info(this.getClass().getName() +" - saveBook");
        // Todo
        return bookRepo.save(book);
    }


    @PutMapping("/{id}")
    public Book updateBook(@RequestBody Book book,@PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateBook " + id);
        // ToDo
        if (this.bookRepo.existsById(id))
            return bookRepo.save(book);
        else
            throw new NoSuchElementException();
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

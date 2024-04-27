package com.sas.controller;

import com.sas.exception.ConflictDeleteException;
import com.sas.model.Book;
import com.sas.model.Role;
import com.sas.model.User;
import com.sas.repository.BookRepository;
import com.sas.repository.RatingRepository;
import com.sas.repository.ReservationRepository;
import com.sas.security.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepo;
    private final RatingRepository ratingRepo;
    private final ReservationRepository reservationRepo;

    public BookController(BookRepository bookRepo, RatingRepository ratingRepo, ReservationRepository reservationRepo) {
        this.bookRepo = bookRepo;
        this.ratingRepo = ratingRepo;
        this.reservationRepo = reservationRepo;
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return bookRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Book> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        //SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // user

        User user = SecurityUtils.getCurrentUser().orElseThrow();
        if (user.getRole().equals(Role.ADMIN))
            return bookRepo.findAll();
        else
            return this.bookRepo.findByAvailableTrue();
    }


    @GetMapping("/isbn/{isbn}")
    public Book findByIsbn(@PathVariable Long isbn) {
        log.info(this.getClass().getName() +" - findByIsbn "+ isbn);
        return bookRepo.findById(isbn).orElseThrow();
    }


    @GetMapping("filter-by-author/{id}")
    public List<Book> findAllByAuthorId(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findAllByAuthorId");
        return bookRepo.findAllByAuthorId(id);
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

        // Opcion 1 Borrar libro desasociando primero los objetos q apunte a el
        try {
            ratingRepo.deleteByBookId(id);
            reservationRepo.deleteByBookId(id);
            bookRepo.deleteById(id);
        } catch (Exception e) {
            log.error("Error borrando libro", e);
            throw new ConflictDeleteException("No es posible borrar el libro");
        }

        // Opcion 2 desactivar/activar libro
        Book book = this.bookRepo.findById(id).orElseThrow();
        book.setAvailable(false);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        bookRepo.deleteAll();
    }
}

package com.sas.controller;

import com.sas.model.Editorial;
import com.sas.repository.EditorialRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/editorials")
public class EditorialController {

    private final EditorialRepository editorialRepo;

    public EditorialController(EditorialRepository editorialRepo) {
        this.editorialRepo = editorialRepo;
    }

    @GetMapping("/{id}")
    public Editorial findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return editorialRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Editorial> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return editorialRepo.findAll();
    }



    @PostMapping()
    public Editorial saveEditorial(@RequestBody Editorial editorial) {
        log.info(this.getClass().getName() +" - saveEditorial");
        // Todo
        return editorialRepo.save(editorial);
    }


    @PutMapping("/{id}")
    public Editorial updateEditorial(@RequestBody Editorial editorial,@PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateEditorial " + id);
        // ToDo
        if (this.editorialRepo.existsById(id))
            return editorialRepo.save(editorial);
        else
            throw new NoSuchElementException();
    }


    @DeleteMapping("/{id}")
    public void deleteEditorial(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - deleteEditorial "+ id);
        editorialRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        editorialRepo.deleteAll();
    }
}

package com.sas.controller;

import com.sas.model.Reservation;
import com.sas.repository.ReservationRepository;
import com.sas.repository.ReservationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservaRepo;

    public ReservationController(ReservationRepository reservaRepo) {
        this.reservaRepo = reservaRepo;
    }

    @GetMapping("/{id}")
    public Reservation findById(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - findById "+ id);
        return reservaRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<Reservation> findAll() {
        log.info(this.getClass().getName() +" - findAll");
        return reservaRepo.findAll();
    }



    @PostMapping()
    public Reservation saveReservation(@RequestBody Reservation reservation) {
        log.info(this.getClass().getName() +" - saveReservation");
        // Todo
        return reservaRepo.save(reservation);
    }


    @PutMapping("/{id}")
    public Reservation updateReservation(@RequestBody Reservation reservation,@PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateReservation " + id);
        // ToDo
        if (this.reservaRepo.existsById(id))
            return reservaRepo.save(reservation);
        else
            throw new NoSuchElementException();
    }


    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        log.info(this.getClass().getName() +" - deleteReservation "+ id);
        reservaRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() +" - deleteAll");
        reservaRepo.deleteAll();
    }
}
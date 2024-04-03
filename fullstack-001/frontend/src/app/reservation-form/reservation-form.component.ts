import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../model/book.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reservation } from '../model/reservation.model';
import { CurrencyPipe } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CurrencyPipe, NgbAlertModule, RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  book: Book | undefined;
  reservation: Reservation | undefined;

  reservationForm = new FormGroup({
    startDate: new FormControl(new Date()),
    finishDate: new FormControl(new Date()),
    isPremiumShip: new FormControl<boolean>(false),
    extraService: new FormControl<string>('0')
  });

  bookPrice = 0; // precio del libro por día
  shipPrice = 0; // precio envío
  extraPrice = 0; // precio extra por servicios extra
  totalPrice = 0; // suma de los anteriores
  numDays = 0;
  showFinishMessage = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      const id = params['id'];
      if(!id) {
        return; // si no hay id entonces no llamamos al backend
      }

      // traer el book
      this.httpClient.get<Book>('http://localhost:8080/books/' + id)
      .subscribe(book => this.book = book);

    });
  }

  calculatePrice () {

    // 1. Obtener fecha inicio y fecha fin
    let startDate = this.reservationForm.get('startDate')?.value;
    let finishDate = this.reservationForm.get('finishDate')?.value;

    if(!startDate || !finishDate || !this.book || !this.book.price) {
      return; // si no hay fechas o libro no calculamos nada, nos vamos
    }

    // 2. Calcular la diferencia de días entre fechas.
    startDate = new Date(startDate);
    finishDate = new Date(finishDate);

    const diffMilliseconds = finishDate.getTime() - startDate.getTime();
    if(diffMilliseconds <= 0) {
      this.bookPrice = 0;
      this.numDays = 0;
      this.totalPrice = 0;
      return; // fechas incorrectas
    }

    this.numDays = Math.round(diffMilliseconds / (1000 * 60 * 60 * 24));
    if(this.numDays <= 0) {
      this.bookPrice = 0;
      this.numDays = 0;
      this.totalPrice = 0;
      return;
    }

    // 3. Calcular precio reserva en base al número de días
    this.bookPrice = this.numDays * this.book.price;
    this.totalPrice = this.bookPrice;

    // 4. Gastos de envío
    if (this.reservationForm.get('isPremiumShip')?.value){
      this.shipPrice = 4.99;
      this.totalPrice += this.shipPrice;
    } else {
      this.shipPrice = 0;
    }

    // 5. Gastos de servicios extra / pack extra

    const extra = this.reservationForm.get('extraService')?.value || '0';
    console.log(extra);
    console.log(typeof extra); //string
    console.log(typeof Number(extra)); // number
    this.extraPrice = Number(extra);
    this.totalPrice += this.extraPrice;

  }

  save () {

    const startDate = this.reservationForm.get('startDate')?.value;
    const finishDate = this.reservationForm.get('finishDate')?.value;
    if(!startDate || !finishDate || !this.book){
      return; // si faltan fechas o libro no se guarda
    }

    const reservation: Reservation = {
      id: 0,
      startDate: startDate,
      finishDate: finishDate,
      price: this.totalPrice,
      book: this.book
    };

    // enviar a backend con httpclient post
    this.httpClient.post<Reservation>('http://localhost:8080/reservations', reservation)
    .subscribe(reservation => {
      this.reservation = reservation;
      this.showFinishMessage = true;
    });

  }
}

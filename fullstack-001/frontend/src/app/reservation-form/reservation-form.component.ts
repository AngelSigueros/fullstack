import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../model/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  book: Book | undefined;

  reservationForm = new FormGroup({
    startDate: new FormControl(new Date()),
    finishDate: new FormControl(new Date()),
    isPremiumShip: new FormControl<boolean>(false)
  });

  bookPrice = 0; // precio del libro por dia
  shipPrice = 0;
  extraPrice = 0;
  totalPrice = 0;
  numDays = 0;

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
      this.httpClient.get<Book>('http://localhost:8080/api/books/' + id)
      .subscribe(book => this.book = book);

    });
  }

  calculatePrice () {

    let startDate = this.reservationForm.get('startDate')?.value;
    let finishDate = this.reservationForm.get('finishDate')?.value;

    if(!startDate || !finishDate || !this.book || !this.book.price) {
      return;
    }

    startDate = new Date(startDate);
    finishDate = new Date(finishDate);

    const diffMillseconds = finishDate.getTime() - startDate.getTime();
    if(diffMillseconds<=1) {
      return;
    }
    
    this.numDays = diffMillseconds / (1000 * 60 * 60 * 24);

    this.bookPrice = this.numDays * this.bookPrice;
    console.log(this.bookPrice);
    this.shipPrice = 4.99;
    this.extraPrice = 5;
    this.totalPrice = 20;
  }

}

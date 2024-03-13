import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {

  bookForm = this.fb.group({
    id: [0],
    title: [''],
    isbn: [''],
    price: [0.0],
    publishDate: [new Date()]
  });

  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private activateRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    console.log('BookFormComponent - OnInit');
    this.activateRoute.params.subscribe(params=> {
      const id = params['id'];
      console.log(id);
      if (!id) return;
      this.http.get<Book>('http://localhost:8080/api/books/'+ id).subscribe(book=>this.bookForm.reset({
        id: book.id,
        title: book.title,
        isbn: book.isbn,
        price: book.price,
        publishDate: book.publishDate
      })
    )});
  }

  save() {
    // Mas rapido, Recoger datos del form
    const book: Book = {
      id: this.bookForm.get('id')?.value ?? 0,
      title: this.bookForm.get('title')?.value ?? '',
      isbn: this.bookForm.get('isbn')?.value ?? '',
      price: this.bookForm.get('price')?.value ?? 0,
      publishDate: this.bookForm.get('publishDate')?.value ?? new Date()
    } 
    console.log(book);

    // Mas rapido, Recoger datos del form
    const book2: Book = this.bookForm.value as Book;

    const url = 'http://localhost:8080/api/books';

    // this.http.post<Book>(url, book).subscribe(book=>{
    //   console.log(book);
    //   // navegar hacia el listado
    //   //this.router.navigate(['/books']);
    //   // o navegar hacia el listado
    //   this.router.navigate(['/books', book.id, 'detail']);
    //   }, error=>{
    //     window.alert("Errroorr: Datos incorrectos");
    //   });

      // Para evita el deprecated
      this.http.post<Book>(url, book).subscribe({
        // si todo ok va a next
        next: book=>this.router.navigate(['/books', book.id, 'detail']),
        // si va mal va a error
        error: error=>window.alert("Errroorr: Datos incorrectos")
      });
      

  }
}

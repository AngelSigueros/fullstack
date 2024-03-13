import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {

  isUpdated: boolean = false;
  authors: Author[]=[]; // Lista de autores para añadir/asociar al libro

  bookForm = this.fb.group({
    id: [0],
    title: [''],
    isbn: [''],
    price: [0.0],
    publishDate: [new Date()],
    author: this.fb.group({
      id: [0],
      name: [''],
      country: [''],
      active: [true]
    })
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('BookFormComponent - OnInit');

    this.http.get<Author[]>("http://localhost:8080/api/authors").subscribe(a=>this.authors=a);

    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      if (!id) return;
      this.http
        .get<Book>('http://localhost:8080/api/books/' + id)
        .subscribe((book) => {
          this.bookForm.reset({
            id: book.id,
            title: book.title,
            isbn: book.isbn,
            price: book.price,
            publishDate: book.publishDate,
            author: book.author
          });
          // marcar boolean true isUpdate
          this.isUpdated = true;
        });
    });
  }


  save() {
    const book: Book = this.bookForm.value as Book;

    if (this.isUpdated) {
      const url = 'http://localhost:8080/api/books/'+ book.id;
      this.http.put<Book>(url, book).subscribe(book=>
        this.router.navigate(['/books', book.id, 'detail']));
    } else {
      const url = 'http://localhost:8080/api/books';
      this.http.post<Book>(url, book).subscribe(book=>
        this.router.navigate(['/books', book.id, 'detail']));
    }
     

  }
/*
  save2() {
    // Mas rapido, Recoger datos del form
    const book: Book = {
      id: this.bookForm.get('id')?.value ?? 0,
      title: this.bookForm.get('title')?.value ?? '',
      isbn: this.bookForm.get('isbn')?.value ?? '',
      price: this.bookForm.get('price')?.value ?? 0,
      publishDate: this.bookForm.get('publishDate')?.value ?? new Date(),
      //author: this.bookForm.get('author')?.get('name')?.value ?? '',
    };
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

    // Para evitar el deprecated
    this.http.post<Book>(url, book).subscribe({
      // si todo ok va a next
      next: (book) => this.router.navigate(['/books', book.id, 'detail']),
      // si va mal va a error
      error: (error) => window.alert('Errroorr: Datos incorrectos'),
    });
  }
  */
}

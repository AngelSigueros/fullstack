import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../model/book.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-book-list',
    standalone: true,
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.css',
    imports: [DatePipe, RouterLink, HttpClientModule, NgbAlertModule, BookDetailComponent]
})

/*
export class BookListComponent implements OnInit {

  books: Book[]=[];
  showDeleteBook: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log('BookListComponent - ngOnInit');

    const url = "http://localhost:8080/api/books";
    this.http.get<Book[]>(url).subscribe(books=>this.books=books)
  }

  borrarLibro(id: number) {
    console.log('BookListComponent - borrarLibro');

    if (!id) return;
    
    const url = "http://localhost:8080/api/books/"+ id;
    this.http.delete(url).subscribe(b=>console.log('Libro eliminado'));

    // elimino el libro del array books
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  borrarTodo() {
    console.log('BookListComponent - borrarTodo');

    const url = "http://localhost:8080/api/books";
    this.http.delete(url).subscribe(b=>console.log('Todos los libro eliminados'));

    // vaciar el arrary de books
    this.books.length=0;
  }

}
*/
export class BookListComponent implements OnInit {
  books: Book[] = [];
  showDeletedBookMessage: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
  }
  
  delete(book: Book) {
    const url = 'https://fullstack-byvu.onrender.com/api/books/' + book.id;
    this.httpClient.delete(url).subscribe((response) => {
      this.loadBooks();
      this.showDeletedBookMessage = true;
    }); // recarga los libros despues de borrar
  }
  
  hideDeletedBookMessage() {
    this.showDeletedBookMessage = false;
  }
  
  private loadBooks() {
    const url = 'https://fullstack-byvu.onrender.com/api/books';
    this.httpClient.get<Book[]>(url).subscribe((books) => (this.books = books));
  }


}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: Book[]=[];

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

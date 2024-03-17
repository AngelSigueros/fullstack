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
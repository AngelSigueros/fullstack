import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../model/book.model';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';

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
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  ngOnInit(): void {
    this.loadBooks();
  }
  
  delete(book: Book) {
    const url = 'http://localhost:8080/api/books/' + book.id;
    this.httpClient.delete(url).subscribe((response) => {
      this.loadBooks();
      this.showDeletedBookMessage = true;
    }); // recarga los libros despues de borrar
  }
  
  hideDeletedBookMessage() {
    this.showDeletedBookMessage = false;
  }
  
  private loadBooks() {
    const url = 'http://localhost:8080/api/books';
    this.httpClient.get<Book[]>(url).subscribe((books) => (this.books = books));
  }
}
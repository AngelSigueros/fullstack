import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Author } from '../model/author.model';
import { RouterLink } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAlertModule],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  authors: Author[] = [];
  showDeletedAuthorMessage: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadAuthors();
  }
  
  delete(author: Author) {
    const url = 'http://localhost:8080/api/authors/' + author.id;
    this.httpClient.delete(url).subscribe((response) => {
      this.loadAuthors();
      this.showDeletedAuthorMessage = true;
    }); // recarga los libros despues de borrar
  }
  
  hideDeletedAuthorMessage() {
    this.showDeletedAuthorMessage = false;
  }
  
  private loadAuthors() {
    const url = 'http://localhost:8080/api/authors';
    this.httpClient.get<Author[]>(url).subscribe(authors=>this.authors=authors);
  }
}

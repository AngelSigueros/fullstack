import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from '../model/author.model';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})
export class AuthorDetailComponent {

  url_base = 'http://localhost:8080/api/authors'; // https://fullstack-byvu.onrender.com/api/authors/
  url_base_books = 'http://localhost:8080/api/books'

  author: Author | undefined;
  books: Book[] = [];

  constructor(private activeRoute: ActivatedRoute, 
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log('AuthorDetailComponent - ngOnInit');

    this.activeRoute.params.subscribe(params=>{
      const id = params['id'];
      if (!id) return;

      const url = this.url_base + '/'+ id;
      console.log(url);
      this.http.get<Author>(url).subscribe(author=>this.author=author);

      const url_filter = this.url_base_books + '/filter-by-author/' + id;
      console.log(url_filter);
      this.http.get<Book[]>(url_filter).subscribe(books=>this.books=books);

    })
  }

  borrarAuthor(id: number) {
    console.log('AuthorDetailComponent - borrarAuthor');
    
    if (!id) return;
    
    const url = this.url_base + id;
    console.log(url);
    this.http.delete(url).subscribe(a=>console.log('Autor eliminado'));

    // No llama al OnIit ToDo
    this.router.navigate(['/authors']);

  }
}
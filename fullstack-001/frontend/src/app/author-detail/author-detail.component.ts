import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from '../model/author.model';
import { Book } from '../model/book.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})


export class AuthorDetailComponent implements OnInit{

  author: Author | undefined;
  books: Book[] = [];

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

      // traer el autor
      this.httpClient.get<Author>('http://localhost:8080/api/authors/' + id)
      .subscribe(author => this.author = author);

      // traer los libros del autor
      this.httpClient.get<Book[]>('http://localhost:8080/api/books/filter-by-author/' + id)
      .subscribe(books => this.books = books);
    });
  }

}


// export class AuthorDetailComponent {

//   url_base = 'http://localhost:8080/api/authors'; // https://fullstack-byvu.onrender.com/api/authors/
//   url_base_books = 'http://localhost:8080/api/books'

//   author: Author | undefined;
//   books: Book[] = [];

//   constructor(private activeRoute: ActivatedRoute, 
//     private http: HttpClient,
//     private router: Router) {
//   }

//   ngOnInit(): void {
//     console.log('AuthorDetailComponent - ngOnInit');

//     this.activeRoute.params.subscribe(params=>{
//       const id = params['id'];
//       if (!id) return;

//       const url = this.url_base + '/'+ id;
//       console.log(url);
//       this.http.get<Author>(url).subscribe(author=>this.author=author);

//       const url_filter = this.url_base_books + '/filter-by-author/' + id;
//       console.log(url_filter);
//       this.http.get<Book[]>(url_filter).subscribe(books=>this.books=books);

//     })
//   }

//   borrarAuthor(id: number) {
//     console.log('AuthorDetailComponent - borrarAuthor');
    
//     if (!id) return;
    
//     const url = this.url_base + id;
//     console.log(url);
//     this.http.delete(url).subscribe(a=>console.log('Autor eliminado'));

//     // No llama al OnIit ToDo
//     this.router.navigate(['/authors']);

//   }
// }
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

  book: Book | undefined;

  constructor(private activeRoute: ActivatedRoute, 
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log('BookDetailComponent - ngOnInit');

    this.activeRoute.params.subscribe(params=>{
      const id = params['id'];
      const url = "http://localhost:8080/api/books/"+ id;
      this.http.get<Book>(url).subscribe(book=>this.book=book)
    })
  }

  borrarBook(id: number) {
    console.log('BookDetailComponent - borrarBook');
    
    if (!id) return;
    
    const url = "http://localhost:8080/api/books/"+ id;
    this.http.delete(url).subscribe(b=>console.log('Libro eliminado'));

    // No llama al OnIit ToDo
    this.router.navigate(['/books']);

  }
}
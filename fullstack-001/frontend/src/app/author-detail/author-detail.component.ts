import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Author } from '../models/author.model';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.css'
})
export class AuthorDetailComponent {

  author: Author | undefined;

  constructor(private activeRoute: ActivatedRoute, 
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log('AuthorDetailComponent - ngOnInit');

    this.activeRoute.params.subscribe(params=>{
      const id = params['id'];
      const url = "http://localhost:8080/api/authors/"+ id;
      this.http.get<Author>(url).subscribe(Author=>this.author=Author)
    })
  }

  borrarAuthor(id: number) {
    console.log('AuthorDetailComponent - borrarAuthor');
    
    if (!id) return;
    
    const url = "http://localhost:8080/api/authors/"+ id;
    this.http.delete(url).subscribe(a=>console.log('Autor eliminado'));

    // No llama al OnIit ToDo
    this.router.navigate(['/authors']);

  }
}
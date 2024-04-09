import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Rating } from '../model/rating.dto';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  
  book: Book | undefined;
  ratings: Rating[] = [];
  ratingForm = new FormGroup({
    score: new FormControl(),
    comment: new FormControl('')
  });

  constructor(private activeRoute: ActivatedRoute, 
    private http: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log('BookDetailComponent - ngOnInit');

    this.activeRoute.params.subscribe(params=>{
      const id = params['id'];
      if (!id) return;
      
      const url = "http://localhost:8080/api/books/"+ id;
      this.http.get<Book>(url).subscribe(book=>this.book=book)

      this.http.get<Rating[]>('http://localhost:8080/ratings/filter-by-book/' + id)
      .subscribe(ratings => this.ratings = ratings);
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

  save(){
    const rating: Rating = {
      id: 0,
      score: this.ratingForm.get('score')?.value ?? 0,
      comment: this.ratingForm.get('comment')?.value ?? '',
      book: this.book
    };

    this.http.post<Rating>('http://localhost:8080/ratings', rating)
    .subscribe(rating=> {
      this.ratingForm.reset();

      this.http.get<Rating[]>('http://localhost:8080/ratings/filter-by-book/' + this.book?.id)
      .subscribe(ratings => this.ratings = ratings);
    })
  }
}
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css',
})
export class AuthorFormComponent implements OnInit {
  
  onFileChange($event: Event) {
    
  }

  authorForm = new FormGroup({
    fullName: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}

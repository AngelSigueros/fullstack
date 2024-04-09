import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css',
})
export class AuthorFormComponent implements OnInit {
  
  photoFile: File | undefined;
  photoPreview: string | undefined;
  authorForm = new FormGroup({
    fullName: new FormControl(''),
  });

  
  constructor(private http: HttpClient) {}

  
  ngOnInit(): void {}

  
  onFileChange(event: Event) {
    console.log(event);
    
    let target = event.target as HTMLInputElement; 
    if (target.files === null || target.files.length == 0)
      return;
    
    console.log(target.files[0]);

    this.photoFile = target.files[0];

    // mostrar img
    let reader = new FileReader();
    reader.onload = event => this.photoPreview = reader.result as string;
    reader.readAsDataURL(this.photoFile);

  }

  save(){}
}

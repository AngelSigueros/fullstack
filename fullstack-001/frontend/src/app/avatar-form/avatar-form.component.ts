import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-avatar-form',
  standalone: true,
  imports: [],
  templateUrl: './avatar-form.component.html',
  styleUrl: './avatar-form.component.css'
})
export class AvatarFormComponent implements OnInit {

  user: User | undefined;
  photoFile: File | undefined;
  photoPreview: string | undefined;

  constructor(private httpClient: HttpClient) {}


  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:8080/api/users/avatar')
      .subscribe(user=>this.user=user)
  }


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


  save() {
    if (!this.photoFile)
      return;

    let formData = new FormData();
    formData.append("photo", this.photoFile);
    this.httpClient.post<User>('http://localhost:8080/api/users/avatar', formData)
    .subscribe(user=>this.user=user);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css',
})
export class AccountFormComponent implements OnInit {
  user: User | undefined;
  userForm = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    street: new FormControl()
  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    console.log('AccountFormComponent - OnInit');
    

    this.httpClient
      .get<User>('http://localhost:8080/api/users/account')
      .subscribe((user) => {
        this.user = user;
        console.log(user);
        this.userForm.reset(user);
      });
  }

  save() {
    if (!this.user) 
      return;

    console.log(this.user);
    this.user.name = this.userForm.get('name')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.street = this.userForm.get('street')?.value;
    //this.user = this.userForm.value as User;
    console.log(this.user);

    this.httpClient.put<User>('http://localhost:8080/api/users/account', this.user)
      .subscribe(user=>this.user=user);
  }
}

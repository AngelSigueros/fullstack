import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../model/login.dto';
import { Token } from '../model/token.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  save() {
    const login: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? ''
    };
    console.log(login);

    const url = 'http://localhost:8080/api/users/login';
    this.httpClient.post<Token>(url, login).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/books']);
      },
      error: response => {
        console.log(response);
        this.errorMessage = response.error;
      }
      
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../model/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // no necesita FormBuilder:
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
  },
  {validators: this.passwordConfirmValidator} // Validador personalizado que comprueba dos campos al mismo tiempo
  );

  errorMessage = '';
  successMessage = false;

  constructor(private httpClient: HttpClient,
    private router: Router
  ) {}

  passwordConfirmValidator(control: AbstractControl) {

    if (control.get('password')?.value === control.get('passwordConfirm')?.value) {
      return null; // las password coinciden por tanto no hay error devolvemos null
    } else {
      // las password no coinciden devolver un error:
      return {
        'confirmError': true
      }
    }
  }

  save() {
    const register: Register = {
      email: this.registerForm.get('email')?.value ?? '',
      //phone: this.registerForm.get('phone')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? ''
    }
    console.log(register);
    
    // enviar registro a backend
    this.httpClient.post('http://localhost:8080/api/users/register', register)
    .subscribe({
      next: response => {
      //limpiar el formulario o redirigir a pantalla de login
      this.registerForm.reset();
      this.successMessage = true;
      //this.router.navigate(['/books']);
      },
      error: response => {
        console.log(response);
        this.errorMessage = response.error;
      } 
    });
  }
}

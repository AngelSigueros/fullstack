import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject<boolean>(this.existToken());

  constructor() { }

  existToken() {
    return localStorage.getItem("jwt_token") != null;
  }

  saveToken(token: string) {
    localStorage.setItem("jwt_token", token);
    this.isLoggedIn.next(true);
  }

  removeToken() {
    localStorage.removeItem("jwt_token");
    this.isLoggedIn.next(false);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  isLoggedIn = false;
  userEmail = '';
  isAdmin = false;

  constructor(private authService: AuthenticationService,
    private router: Router) {
    this.authService.isLoggedIn.subscribe(isLoggedIn=>this.isLoggedIn=isLoggedIn);
    this.authService.userEmail.subscribe(userEmail=>this.userEmail=userEmail);
    this.authService.isAdmin.subscribe(isAdmin=>this.isAdmin=isAdmin);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  constructor(private authService: AuthenticationService) {
    this.authService.isLoggedIn.subscribe(isLoggedIn=>this.isLoggedIn=isLoggedIn);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router, private authService: AuthService) {}

  goToFavorites() {
    this.router.navigate(['/', 'favorites']);
  }

  goToRecommendations() {
    this.router.navigate(['/','recommendations']);
  }

  goToMyAccount() {
    this.router.navigate(['/', 'myAccount']);
  }

  goToHome() {
    this.router.navigate(['/', 'home']);
  }

  goToLogin() {
    this.router.navigate(['/', 'login']);
  }

  goToRegister() {
    this.router.navigate(['/', 'register']);
  }

  userLoggedIn() {
    return this.authService.checkUserStatus();
  }
}

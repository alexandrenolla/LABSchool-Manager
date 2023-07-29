import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = true; // Needs proper authentication to set this value

  constructor(private router: Router) {}

  logout() {
    // Needs logout logic here to clear the context information and redirect to the login page
    // For this example, just redirect to the login page
    this.router.navigate(['/login']);
  }
}

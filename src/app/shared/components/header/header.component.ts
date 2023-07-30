import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = true; 

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem("logado")
    this.router.navigate(['/login']);
  }
}

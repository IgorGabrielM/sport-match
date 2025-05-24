import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('idUser');
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    localStorage.removeItem('idUser');
    window.location.reload();
  }
}

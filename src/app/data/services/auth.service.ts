import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(token: string) {
    localStorage.setItem('userToken', token);
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }
}

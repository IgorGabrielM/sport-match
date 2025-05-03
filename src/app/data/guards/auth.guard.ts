import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('userToken'); // Simples verificação (pode ser mais sofisticada)

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redireciona se não estiver autenticado
      return false;
    }

    return true;
  }
}

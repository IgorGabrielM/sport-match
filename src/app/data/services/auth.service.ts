import { Injectable } from '@angular/core';
import {AuthModel, CreateUserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(auth: AuthModel) {
    return this.http.post(`http://localhost:3000/auth`, auth);
  }

  logout() {
    localStorage.removeItem('idUser');
  }

  createUser(user: CreateUserModel){
    return this.http.post(`http://localhost:3000/users`, user);
  }

  getUser(){
    return this.http.get(`http://localhost:3000/users/${localStorage.getItem('idUser')}`);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('idUser');
  }
}

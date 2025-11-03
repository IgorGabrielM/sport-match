import { Injectable } from '@angular/core';
import {AuthModel, CreateUserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://sport-match-server-b9dc84641b20.herokuapp.com/auth';

  constructor(private http: HttpClient) {}

  login(auth: AuthModel) {
    return this.http.post(`https://sport-match-server-b9dc84641b20.herokuapp.com/auth`, auth);
  }

  logout() {
    localStorage.removeItem('idUser');
  }

  createUser(user: CreateUserModel){
    return this.http.post(`https://sport-match-server-b9dc84641b20.herokuapp.com/users`, user);
  }

  getUser(){
    return this.http.get(`https://sport-match-server-b9dc84641b20.herokuapp.com/users/${localStorage.getItem('idUser')}`);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('idUser');
  }
}

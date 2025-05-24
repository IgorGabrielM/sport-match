import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../data/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  providers: [
    AuthService
  ],
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const payload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(payload).subscribe((response: any) => {
      if (response.user.idUser){
        localStorage.setItem('idUser', response.user.idUser);
        this.router.navigate(['/']);
      }
    });
    this.router.navigate(['/']);
  }
}

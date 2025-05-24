import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../data/services/auth.service';
import {Router} from '@angular/router';
import {CreateUserModel} from '../../data/models/user.model';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  providers: [
    AuthService
  ],
  standalone: true
})
export class CreateUserComponent implements OnInit {
  user: CreateUserModel
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createUser() {
    const payload: CreateUserModel= {
      name: this.loginForm.get('name')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      interests: []
    }
    this.authService.createUser(payload).subscribe((response: any) => {
      if (response.idUser){
        localStorage.setItem('idUser', response.idUser);
        this.router.navigate(['/']);
      }
    })
  }
}

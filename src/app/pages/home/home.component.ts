import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../data/services/auth.service';
import {HeaderComponent} from '../../components/header/header.component';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardEventComponent} from '../../components/card-event/card-event.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CardEventComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.searchForm = this.fb.group({
      category: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nameEvent: ['', [Validators.required]]
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

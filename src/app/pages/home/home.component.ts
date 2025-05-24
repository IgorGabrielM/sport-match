import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../data/services/auth.service';
import {HeaderComponent} from '../../components/header/header.component';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {EventService} from '../../data/services/event.service';
import {EventModel} from '../../data/models/event.model';
import { HttpClientModule } from '@angular/common/http'
import {SlideEventComponent} from '../../components/slide-event/slide-event.component';
import {ImageInputComponent} from '../../components/image-input/image-input.component';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CardEventComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageInputComponent,
    SlideEventComponent,
    ModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    EventService,
    AuthService
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  events: EventModel[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadEvent();
  }

  initForm(){
    this.searchForm = this.fb.group({
      category: ['categoria', [Validators.required]],
      address: ['', [Validators.required]],
      nameEvent: ['', [Validators.required]]
    });
  }

  loadEvent() {
    this.eventService.getEvents().subscribe((events) => {
      console.log(events);
      this.events = events;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../data/models/event.model';
import {Router} from '@angular/router';
import {EventService} from '../../data/services/event.service';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf} from '@angular/common';
import {SlideEventComponent} from '../../components/slide-event/slide-event.component';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-events',
  imports: [
    CardEventComponent,
    FormsModule,
    HeaderComponent,
    NgForOf,
    ReactiveFormsModule,
    SlideEventComponent,
    HttpClientModule,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  providers: [
    EventService
  ],
  standalone: true
})
export class EventsComponent implements OnInit {
  searchForm: FormGroup;
  events: EventModel[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
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
}

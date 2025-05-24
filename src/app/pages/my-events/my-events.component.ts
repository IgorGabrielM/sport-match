import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../data/models/event.model';
import {Router} from '@angular/router';
import {EventService} from '../../data/services/event.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-my-events',
  imports: [
    CardEventComponent,
    FormsModule,
    HeaderComponent,
    NgForOf,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
  providers: [
    EventService
  ],
  standalone: true,
})
export class MyEventsComponent implements OnInit{
  events: EventModel[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    })
  }

}

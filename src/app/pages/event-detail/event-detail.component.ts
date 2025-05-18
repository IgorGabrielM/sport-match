import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {EventModel} from '../../data/models/event.model';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from '../../data/services/event.service';
import {DatePipe, NgForOf} from '@angular/common';
import {CardEventComponent} from '../../components/card-event/card-event.component';

@Component({
  selector: 'app-event-detail',
  imports: [
    HeaderComponent,
    HttpClientModule,
    DatePipe,
    CardEventComponent,
    NgForOf
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
  standalone: true,
  providers: [
    EventService
  ],
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  events: EventModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.findEvents(id).subscribe((event) => {
      this.event = event;
    })
    this.loadEvent();
  }

  loadEvent() {
    this.eventService.getEvents().subscribe((events) => {
      console.log(events);
      this.events = events;
    })
  }
}

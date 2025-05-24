import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {EventModel} from '../../data/models/event.model';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from '../../data/services/event.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {AuthService} from '../../data/services/auth.service';

@Component({
  selector: 'app-event-detail',
  imports: [
    HeaderComponent,
    HttpClientModule,
    DatePipe,
    CardEventComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
  standalone: true,
  providers: [
    EventService,
    AuthService
  ],
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  events: EventModel[] = [];
  showToast: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
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
      this.events = events;
    })
  }

  participar(){
    this.eventService.participar(this.event.id).subscribe((response) => {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    });
  }
}

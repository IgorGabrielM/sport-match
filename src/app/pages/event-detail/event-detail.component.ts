import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {EventModel} from '../../data/models/event.model';
import {HttpClientModule} from '@angular/common/http';
import {EventService} from '../../data/services/event.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {AuthService} from '../../data/services/auth.service';
import {GeminiService} from '../../data/services/gemini.service';
import {MarkdownModule} from 'ngx-markdown';

@Component({
  selector: 'app-event-detail',
  imports: [
    HeaderComponent,
    HttpClientModule,
    DatePipe,
    CardEventComponent,
    NgForOf,
    NgIf,
    MarkdownModule,
    NgClass,
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
  drowerVisible: boolean = false;
  user: any;
  loading = false;
  responseIA: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private geminiService: GeminiService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.findEvents(id).subscribe((event) => {
      this.event = event;
      console.log(event)
    })
    this.loadEvent();
    this.getUser();
  }

  getUser(){
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    })
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
    this.drowerVisible = true;
    this.montarTreino();
  }

  montarTreino() {
    this.loading = true;
    this.geminiService.generateText(this.event.description, this.event.dateTime).subscribe((response) => {
      this.responseIA = response;
      this.loading = false;
    })
  }
}

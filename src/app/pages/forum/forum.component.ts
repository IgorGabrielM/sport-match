import {Component, OnInit} from '@angular/core';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf} from '@angular/common';
import {SlideEventComponent} from '../../components/slide-event/slide-event.component';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventService} from '../../data/services/event.service';
import {EventModel} from '../../data/models/event.model';
import {CardForumComponent} from '../../components/card-forum/card-forum.component';

@Component({
  selector: 'app-forum',
  imports: [
    CardEventComponent,
    FormsModule,
    HeaderComponent,
    NgForOf,
    ReactiveFormsModule,
    SlideEventComponent,
    CardForumComponent,
    HttpClientModule,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  standalone: true,
  providers: [
    EventService
  ],
})
export class ForumComponent implements OnInit {
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
      postMessage: ['', [Validators.required]]
    });
  }

  loadEvent() {
    this.eventService.getEvents().subscribe((events) => {
      console.log(events);
      this.events = events;
    })
  }

  postar(){}
}

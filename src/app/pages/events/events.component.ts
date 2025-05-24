import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../data/models/event.model';
import {Router} from '@angular/router';
import {EventService} from '../../data/services/event.service';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf, NgIf} from '@angular/common';
import {SlideEventComponent} from '../../components/slide-event/slide-event.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent} from '../../components/modal/modal.component';

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
    ModalComponent,
    NgIf,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  providers: [
    EventService
  ],
  standalone: true
})
export class EventsComponent implements OnInit {
  isModalOpen: boolean = false;
  searchForm: FormGroup;
  events: EventModel[] = [];
  allEvents: EventModel[] = [];

  constructor(
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadEvent();
  }

  onModalClose() {
    this.loadEvent();
    this.isModalOpen = false;
  }

  initForm(){
    this.searchForm = this.fb.group({
      address: ['', [Validators.required]],
      nameEvent: ['', [Validators.required]]
    });
  }

  loadEvent() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.allEvents = events;
    })
  }

  filterEvents() {
    const { address, nameEvent } = this.searchForm.value;
    this.events = this.allEvents.filter(event =>
      event.location.toLowerCase().includes(address.toLowerCase()) &&
      event.name.toLowerCase().includes(nameEvent.toLowerCase())
    );
  }
}

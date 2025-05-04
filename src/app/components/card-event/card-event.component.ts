import {Component, Input} from '@angular/core';
import {EventModel} from '../../data/models/event.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-event',
  imports: [
    DatePipe
  ],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.scss',
  standalone: true
})
export class CardEventComponent {
  @Input() event: EventModel;

  constructor(
    private router: Router
  ) {
  }

  navigateToEventDetail(){
    this.router.navigate(['event-detail', this.event.id])
  }

}

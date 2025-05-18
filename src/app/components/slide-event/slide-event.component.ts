import {Component, Input} from '@angular/core';
import {EventModel} from '../../data/models/event.model';
import {NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slide-event',
  imports: [
    NgStyle
  ],
  templateUrl: './slide-event.component.html',
  styleUrl: './slide-event.component.scss',
  standalone: true
})
export class SlideEventComponent {
  @Input() event: EventModel

  constructor(
    private router: Router,
  ) {
  }

  navigateToEvent() {
    this.router.navigate(['event-detail', this.event.id])
  }

}

import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-forum',
  imports: [],
  templateUrl: './card-forum.component.html',
  styleUrl: './card-forum.component.scss',
  standalone: true,
})
export class CardForumComponent {
  constructor(
    private router: Router,
  ) {
  }

  navigate(){
    this.router.navigate(['/posts', 1]);
  }

}

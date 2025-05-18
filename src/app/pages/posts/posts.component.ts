import { Component } from '@angular/core';
import {CardForumComponent} from '../../components/card-forum/card-forum.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [
    CardForumComponent,
    FormsModule,
    HeaderComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: true
})
export class PostsComponent {

}

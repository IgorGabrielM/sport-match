import {Component, OnInit} from '@angular/core';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {NgForOf, NgIf} from '@angular/common';
import {SlideEventComponent} from '../../components/slide-event/slide-event.component';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventService} from '../../data/services/event.service';
import {EventModel} from '../../data/models/event.model';
import {CardForumComponent} from '../../components/card-forum/card-forum.component';
import {ModalPostComponent} from '../../components/modal-post/modal-post.component';
import {PostService} from '../../data/services/post.service';
import {PostModel} from '../../data/models/post.model';
import {ModalComponent} from '../../components/modal/modal.component';

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
    ModalPostComponent,
    ModalComponent,
    NgIf,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  standalone: true,
  providers: [
    EventService,
    PostService
  ],
})
export class ForumComponent implements OnInit {
  isModalOpen: boolean = false;
  searchForm: FormGroup;
  posts: PostModel[] = [];

  constructor(
    private router: Router,
    private postService: PostService,

    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
    this.laoadForum();
  }

  initForm(){
    this.searchForm = this.fb.group({
      postMessage: ['', [Validators.required]]
    });
  }

  onModalClose() {
    console.log("Modal fechado");
    this.isModalOpen = false;
  }

  laoadForum() {
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    })
  }
}

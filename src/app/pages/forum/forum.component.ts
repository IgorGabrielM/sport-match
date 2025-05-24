import {Component, OnInit} from '@angular/core';
import {CardEventComponent} from '../../components/card-event/card-event.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../components/header/header.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
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
import {AuthService} from '../../data/services/auth.service';

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
    DatePipe,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  standalone: true,
  providers: [
    EventService,
    PostService,
    AuthService
  ],
})
export class ForumComponent implements OnInit {
  isModalOpen: boolean = false;
  searchForm: FormGroup;
  posts: PostModel[] = [];

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
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
    this.isModalOpen = false;
  }

  laoadForum() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    })
  }

  sendLike(post: PostModel) {
    localStorage.getItem('idUser')
    this.postService.addLike({idPost: post.idPost, idUser: Number(localStorage.getItem('idUser'))}).then((response) => {
      console.log("Like adicionado com sucesso", response);
    })

    if (this.isLiked(post)) {
      const userId = Number(localStorage.getItem('idUser'));
      const payload = {
        idPost: post.idPost,
        idUser: userId
      }
      post.likes = post.likes.filter((like) => like.idUser !== userId);
      this.postService.removeLike(payload)
    } else {
      const userId = Number(localStorage.getItem('idUser'));
      const payload = {
        idPost: post.idPost,
        idUser: userId
      }

      post.likes.push({ ...post.user, idUser: userId })
      this.postService.addLike(payload).then()
    }
  }

  isLiked(post: PostModel): boolean {
    const userId = Number(localStorage.getItem('userId'));
    return !!(post.likes.find((like) => like.idUser === userId))
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageInputComponent} from '../image-input/image-input.component';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PostService} from '../../data/services/post.service';
import {PostModel} from '../../data/models/post.model';
import {AuthService} from '../../data/services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-modal-post',
  imports: [
    ImageInputComponent,
    FormsModule,
    NgIf,
    HttpClientModule,
  ],  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.scss',
  providers: [
    PostService,
  ],
  standalone: true,
})
export class ModalPostComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();
  text: string
  title: string
  imagem: string

  constructor(
    private postService: PostService,
  ) {}

  closeModal() {
    this.closeEvent.emit();
  }

  sendEvent() {
    const payload: PostModel = {
      imageUrl: this.imagem,
      text: this.text,
      title: this.title,
      likesCount: 0,
      commentsCount: 0,
      interestIds: [],
      idUser: Number(localStorage.getItem('idUser'))
    }
    this.postService.createPost(payload).subscribe(() => {
      this.closeEvent.emit();
    })
  }

  onImageReceived(imageUrl: string) {
    this.imagem = imageUrl;
  }
}

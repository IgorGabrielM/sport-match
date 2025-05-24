import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventService} from '../../data/services/event.service';
import {EventModel} from '../../data/models/event.model';
import {ImageInputComponent} from '../image-input/image-input.component';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PostService} from '../../data/services/post.service';
import {PostModel} from '../../data/models/post.model';

@Component({
  selector: 'app-modal-post',
  imports: [
    ImageInputComponent,
    FormsModule,
    NgIf
  ],  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.scss',
  providers: [
    PostService
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
    private postService: PostService
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
      idUser: 1
    }
    console.log("Payload do evento:", payload);
    this.postService.createPost(payload).subscribe(() => {
      this.closeEvent.emit();
    })
  }

  onImageReceived(imageUrl: string) {
    this.imagem = imageUrl;
    console.log("Imagem recebida no componente pai:", imageUrl);
  }
}

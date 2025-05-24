import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageInputComponent} from '../image-input/image-input.component';
import {FormsModule} from '@angular/forms';
import {EventService} from '../../data/services/event.service';
import {EventModel} from '../../data/models/event.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    ImageInputComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [
    EventService
  ],
  standalone: true,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();
  nome: string
  dataHora: Date
  descricao: string
  imagem: string
  local: string

  constructor(
    private eventService: EventService
  ) {}

  closeModal() {
    this.closeEvent.emit();
  }

  sendEvent() {
    const payload: EventModel = {
      description: this.descricao,
      dateTime: this.dataHora,
      image: this.imagem,
      location: this.local,
      name: this.nome,
    }
    console.log("Payload do evento:", payload);
    this.eventService.createEvent(payload).subscribe(() => {
      this.closeEvent.emit();
    })
  }

  onImageReceived(imageUrl: string) {
    this.imagem = imageUrl;
    console.log("Imagem recebida no componente pai:", imageUrl);
  }
}

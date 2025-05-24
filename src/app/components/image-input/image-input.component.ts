import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
  standalone: true
})
export class ImageInputComponent {

  @Output() imageUploaded = new EventEmitter<string>(); // Emite a URL para o pai

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      try {
        const blob = new Blob([file], { type: file.type });
        const imageUrl = await this.uploadImageToCloudinary(file); // Envia para Cloudinary
        this.imageUploaded.emit(imageUrl); // Emite a URL para o pai
        console.log('Imagem enviada com sucesso:', imageUrl);
      } catch (error) {
        console.error('Erro ao enviar imagem:', error);
      }
    }
  }

  async uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploads");

    const response = await fetch("https://api.cloudinary.com/v1_1/decg2nhir/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // Retorna a URL da imagem
  }
}

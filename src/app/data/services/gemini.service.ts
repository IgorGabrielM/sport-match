import { Injectable } from '@angular/core';
import {GoogleGenerativeAI, GenerateContentResponse, GenerateContentResult} from '@google/generative-ai';
// CORREÇÃO 1: Adicionar o import do 'from' do RxJS
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenerativeAI;
  private modelName = 'gemini-2.5-flash';

  constructor() {
    if (!environment.geminiApiKey) {
      console.error("A chave API do Gemini não está definida. Use um backend (Opção 1) para produção!");
    }
    // O SDK moderno é inicializado de forma síncrona, mas a chamada à API é assíncrona.
    this.ai = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  /**
   * Helper para formatar a data de forma amigável para a IA
   */
  private formatDate(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  /**
   * Envia um prompt de texto para o modelo Gemini e retorna a resposta.
   */
  generateText(descricaoEvento: string, dataEvento: Date): Observable<string> {
    const model = this.ai.getGenerativeModel({ model: this.modelName });
    const dataFormatada = this.formatDate(dataEvento);

    const fullPrompt = `Sou iniciante no esporte, quero que monte um treino para que eu possa participar desse evento:
      ${descricaoEvento}
      Vou participar desse evento no dia ${dataFormatada}.
      Responda de forma curta e objetiva. Inclua as principais fases do treino.`;

    // A chamada 'generateContent' retorna uma Promise.
    console.log('chamou');
    const promise = model.generateContent(fullPrompt)
      .then((result: GenerateContentResult) => {
        console.log(result);
        // O SDK do Gemini v2 tem a propriedade .text, que é a forma mais fácil de obter a string
        return result.response.text();
      });

    // Converte a Promise em um Observable para se integrar ao Angular
    return from(promise).pipe(
      map(text => text.trim()) // Limpa e retorna o texto
    );
  }
}

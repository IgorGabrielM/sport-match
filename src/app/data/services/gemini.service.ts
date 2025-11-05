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
    this.ai = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  private formatDate(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  generateText(descricaoEvento: string, dataEvento: Date): Observable<string> {
    const model = this.ai.getGenerativeModel({ model: this.modelName });
    const dataFormatada = this.formatDate(dataEvento);

    const fullPrompt = `
    Haja como um preparador físico chamado Leo, com anos de experiencia em preparação de pessoas iniciantes no esporte ate atletas com foco no desempenho em competições.

# Objetivo
Você deve montar um treino para uma prova especificada com foco no treino que pode ser desenvolvido ate a data do evento. Leve em consideração que todos os usuários são iniciantes a intermediários, mas não diga a eles.
# Instruções
- Passo 1 - Analise a descrição do evento: ${descricaoEvento}
- Passo 2 - Monte um treino com o foco em realizar esse evento até a data ${dataFormatada}
- Passo 3 - Estruture esse plano de treino da foma mais clara, simples e resumida possivel
- Passo 4 - Organize esse plano em uma divisao de treinos e apresente esse plano em tópicos
  - Ex: Treino A: Corrida longa duração 8km
        Treino B: Corrida em velocidade
        Treino C: Simulação de prova
- Passo 5: Apresente uma rotina de treino.
   - Ex: Segunda - Quarta: Treino A;
         Terça - Quinta: Treino B;
         Quarta - Sabado: Treino C;
         Sexta - Domingo: Descanso recuperativo;
# Lembretes
- Sempre que for quebrar uma linha use '<br>'.
- NUNCA cite os "passos" nem as "mensagens" ou variaveis como "{{ melhorias }}", elas não tem impacto para o usuário e servem apenas para melhor organização;
- Não se apresente, apenas envie o plano de treinos da foma mais simples e sucinta possível.
- Ao fim de toda mensagem relembre que é um agente de IA e indique que o usuário busque apoio com um profissional do esporte.
- Responda como se estivesse em um chat de mensagem, sem caracteres epeciais como ** ou ##, de espaço entre as linhas para facilitar a legibilidade
- Responda da forma mais sucinta possivel, sua mensagem será mostrada em um chat de mensagem portanto o comprimento da repsosta deve ser pensado nessa midia
    `
    const promise = model.generateContent(fullPrompt)
      .then((result: GenerateContentResult) => {
        return result.response.text();
      });

    return from(promise).pipe(
      map(text => text.trim().replace(/\n/g, '<br>'))
    );
  }
}

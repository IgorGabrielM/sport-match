import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripMarkdown',
  standalone: true
})
export class StripMarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      // Remove imagens: ![alt](url)
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Remove links: [text](url)
      .replace(/\[([^\]]+)\]\((.*?)\)/g, '$1')
      // Remove símbolos markdown: *, _, `, >, #, -
      .replace(/[*_`>#-]/g, '')
      // Remove quebras de linha
      .replace(/(\r\n|\n|\r)/gm, ' ')
      // Remove espaços extras
      .replace(/\s+/g, ' ')
      .trim();
  }
}

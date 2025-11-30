import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(items: any[], term: string, keys: string[] = []): any[] {
    if (!term) return items;
    const lower = term.toLowerCase();
    return items.filter(item =>
      keys.some(k => ('' + (item[k] ?? '')).toLowerCase().includes(lower))
    );
  }
}

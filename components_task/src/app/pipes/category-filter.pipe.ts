import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({ name: 'categoryFilter' })
export class CategoryFilterPipe implements PipeTransform {
  transform(items: Book[], category?: string): Book[] {
    if (!category || category === 'all') return items;
    return items.filter(i => i.category?.toLowerCase() === category.toLowerCase());
  }
}

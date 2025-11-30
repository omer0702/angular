import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookService } from '../../../services/book.service';
import { SearchPipe } from '../../../pipes/search.pipe';
import { CategoryFilterPipe } from '../../../pipes/category-filter.pipe';
import { BookItemComponent } from '../book-item/book-item';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BookItemComponent, SearchPipe, CategoryFilterPipe],
  templateUrl: './books-list.html',
  styleUrls: ['./books-list.css']
})
export class BooksListComponent {
  books: any[] = [];
  search = '';
  category = 'all';

  constructor(private bookService: BookService) {
    this.books = this.bookService.getAll();
  }

  deleteBook(id: number) {
    if (confirm('למחוק ספר?')) {
      this.bookService.delete(id);
      this.books = this.bookService.getAll();
    }
  }

  toggle(id: number) {
    this.bookService.toggleAvailability(id);
    this.books = this.bookService.getAll();
  }
}

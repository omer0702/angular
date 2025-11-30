import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-item.html',
  styleUrls: ['./book-item.css']
})
export class BookItemComponent {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  edit() {}
  remove() { this.delete.emit(this.book.id as unknown as string); }
  toggleAvail() { this.toggle.emit(this.book.id as unknown as string); }
}

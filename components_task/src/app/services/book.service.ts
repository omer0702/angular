import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

const STORAGE_KEY = 'lm_books_v1';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>(this.loadFromStorage());
  books$ = this.booksSubject.asObservable();

  constructor() {
    if (!this.booksSubject.value || this.booksSubject.value.length === 0) {
      const demo: Book[] = [
        { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, category: 'Programming', available: true },
        { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: 1999, category: 'Programming', available: true },
      ];
      this.setAll(demo);
    }
  }

  private loadFromStorage(): Book[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Book[] : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(books: Book[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    this.booksSubject.next(books);
  }

  private setAll(books: Book[]) {
    this.saveToStorage(books);
  }

  getAll(): Book[] {
    return this.booksSubject.value;
  }

  getById(id: number): Book | undefined {
    return this.getAll().find(b => b.id === id);
  }

  add(book: Book) {
    const books = [...this.getAll()];
    book.id = this.generateId(books);
    books.push(book);
    this.saveToStorage(books);
  }

  update(book: Book) {
    const books = this.getAll().map(b => b.id === book.id ? book : b);
    this.saveToStorage(books);
  }

  delete(id: number) {
    const books = this.getAll().filter(b => b.id !== id);
    this.saveToStorage(books);
  }

  toggleAvailability(id: number) {
    const books = this.getAll().map(b => b.id === id ? { ...b, available: !b.available } : b);
    this.saveToStorage(books);
  }

  private generateId(books: Book[]): number {
    return books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
  }
}

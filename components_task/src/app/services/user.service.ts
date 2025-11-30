import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

const STORAGE_KEY = 'lm_users_v1';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>(this.loadFromStorage());
  users$ = this.usersSubject.asObservable();

  constructor() {
    const current = this.usersSubject.value;
    if (!current || current.length === 0) {
      const demo: User[] = [
        { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        { id: 2, name: 'Liora', email: 'liora@example.com', role: 'member' },
      ];
      this.setAll(demo);
    }
  }

  private loadFromStorage(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as User[] : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(users: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    this.usersSubject.next(users);
  }

  private setAll(users: User[]) {
    this.saveToStorage(users);
  }

  getAll(): User[] {
    return this.usersSubject.value;
  }

  getById(id: number): User | undefined {
    return this.getAll().find(u => u.id === id);
  }

  add(user: User) {
    const users = [...this.getAll()];
    user.id = this.generateId(users);
    users.push(user);
    this.saveToStorage(users);
  }

  update(user: User) {
    const users = this.getAll().map(u => u.id === user.id ? user : u);
    this.saveToStorage(users);
  }

  delete(id: number) {
    const users = this.getAll().filter(u => u.id !== id);
    this.saveToStorage(users);
  }

  private generateId(users: User[]): number {
    return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}

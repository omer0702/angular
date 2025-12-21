import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';


const STORAGE_KEY = 'lm_users_v1';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  private generateId(users: User[]): number {
    return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }

  private apiUrl = 'http://localhost:3000/api/users';



  loadUsers() {
    this.http.get<User[]>(this.apiUrl)
      .subscribe(users => this.usersSubject.next(users));
  }

  addUser(user: User) {
    this.http.post<User>(this.apiUrl, user)
      .subscribe(() => this.loadUsers());
  }

  updateUser(id: number, user: User) {
    this.http.put(`${this.apiUrl}/${id}`, user)
      .subscribe(() => this.loadUsers());
  }

  delete(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.loadUsers());
  }
}

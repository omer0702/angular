import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSubject = new BehaviorSubject<User | null>(this.loadUser());
  currentUser$ = this.loggedInSubject.asObservable();

  private STORAGE_KEY = 'lm_current_user';

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }

  login(user: User) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.loggedInSubject.next(user);
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loggedInSubject.next(null);
  }

  get currentUser(): User | null {
    return this.loggedInSubject.value;
  }
}

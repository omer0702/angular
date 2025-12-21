import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BooksListComponent } from './components/books/books-list/books-list';
import { BookEditComponent } from './components/books/book-edit/book-edit';
import { BookItemComponent } from './components/books/book-item/book-item';
import { UsersListComponent } from './components/users/users-list/users-list';
import { UserEditComponent } from './components/users/user-edit/user-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: 'books/add', component: BookEditComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: UserEditComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
    { path: '**', redirectTo: 'books' }
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { UsersListComponent } from './components/users/users-list/users-list';
import { UserEditComponent } from './components/users/user-edit/user-edit';
import { BooksListComponent } from './components/books/books-list/books-list';
import { BookEditComponent } from './components/books/book-edit/book-edit';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'users/add', component: UserEditComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/add', component: BookEditComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: '**', redirectTo: '/books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

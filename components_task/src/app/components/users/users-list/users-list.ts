import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { UserItemComponent } from "../user-item/user-item";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchPipe } from "../../../pipes/search.pipe";

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    UserItemComponent,
    SearchPipe
]
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  searchTerm = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loadUsers();
    this.userService.users$.subscribe(u => this.users = u);
  }

  deleteUser(id: number) {
    if (confirm('למחוק משתמש?')) {
      this.userService.delete(id);
    }
  }
}

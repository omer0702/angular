import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-item',
  standalone: true,
  templateUrl: './user-item.html',
  styleUrls: ['./user-item.css'],
  imports: [CommonModule]
})
export class UserItemComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();


  constructor(private router: Router) {}

  edit() {
    this.router.navigate(['/users/edit', this.user.id]);
  }

  remove() {
    this.delete.emit(this.user.id);
  }
}

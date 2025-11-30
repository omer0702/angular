import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserEditComponent implements OnInit {
  isEdit = false;
  userId?: number;
  form: any;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    const form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['member', Validators.required]
  });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.userId = +idParam;
      const user = this.userService.getById(this.userId!);
      if (user) {
        this.form.patchValue(user);
      }
    }
  }

  save() {
    if (this.form.invalid) return;
    const payload: User = { id: this.userId ?? 0, ...this.form.value } as User;
    if (this.isEdit) {
      this.userService.update(payload);
    } else {
      this.userService.add(payload);
    }
    this.router.navigate(['/users']);
  }
}

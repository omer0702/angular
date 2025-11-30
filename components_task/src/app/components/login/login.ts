import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  

  error = '';
  form: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
      this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  
  submit() {
    this.error = '';
    if (this.form.invalid) return;
    const email = this.form.value.email!.toLowerCase();
    const user = this.userService.getAll().find(u => u.email.toLowerCase() === email);
    if (user) {
      this.auth.login(user);
      this.router.navigate(['/books']);
    } else {
      this.error = 'לא נמצא משתמש עם המייל הזה';
    }
  }
}

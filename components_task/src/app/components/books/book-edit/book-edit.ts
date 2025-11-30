import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.html',
  styleUrls: ['./book-edit.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class BookEditComponent implements OnInit {
  isEdit = false;
  id?: number;
  form: any;



  constructor(private fb: FormBuilder,private route: ActivatedRoute,private bookService: BookService,private router: Router) {
      const form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: [null, [Validators.min(1000), Validators.max(new Date().getFullYear())]],
      category: ['Programming'],
      available: [true]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      const book = this.bookService.getById(this.id);
      if (book) this.form.patchValue(book);
    }
  }

  save() {
    if (this.form.invalid) return;
    const payload: Book = { id: this.id ?? 0, ...this.form.value } as Book;
    if (this.isEdit) this.bookService.update(payload);
    else this.bookService.add(payload);
    this.router.navigate(['/books']);
  }
}

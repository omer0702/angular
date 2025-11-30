import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.html',
  imports: [FormsModule]
})
export class FilterBarComponent {
  @Output() search = new EventEmitter<string>();
  term = '';

  onInput() {
    this.search.emit(this.term);
  }
}

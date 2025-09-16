import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  imports: [FormsModule],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css'
})
export class PersonalDetails {
  title = "personal details:"
  first_name = "omer"
  last_name = "gal"
  age = "70"
  gender = "male"
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Notes } from '../components/notes/notes';
import { PersonalDetails } from '../components/personal-details/personal-details';
import { History } from '../components/history/history';


@Component({
  selector: 'app-root',
  imports: [Notes,PersonalDetails,History],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  text = "Resume"
}

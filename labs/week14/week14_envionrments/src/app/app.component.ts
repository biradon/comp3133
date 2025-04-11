import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'week14_envionrments';

  myEnv: any = environment

  ngOnInit() {
    console.log(`environment.apiURL: ${environment.apiURL}`)
    console.log(`environment.ENV: ${environment.ENV}`)  }
}

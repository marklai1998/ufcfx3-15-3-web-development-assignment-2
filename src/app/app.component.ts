import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMap],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'atm-today-web-angular';

  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };

}

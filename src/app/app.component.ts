import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMap],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  options: google.maps.MapOptions = {
    center: { lat: 22.3316025, lng: 114.12776 },
    zoom: 12,
    clickableIcons: false,
    disableDefaultUI: true,
  }

  width = '100vw'
  height = '100vh'
}

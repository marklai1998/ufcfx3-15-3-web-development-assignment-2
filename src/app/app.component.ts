import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GoogleMap } from '@angular/google-maps'
import { District, listDistrict } from './services/listDistrict'
import { Bank, listBank } from './services/listBank'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMap],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  options: google.maps.MapOptions = {
    center: { lat: 22.3316025, lng: 114.12776 },
    zoom: 12,
    clickableIcons: false,
    disableDefaultUI: true,
  }

  width = '100vw'
  height = '100vh'
  language = 'en'

  banks: Bank[] = []
  districts: District[] = []

  async loadSelections() {
    const [{ banks }, { districts }] = await Promise.all([
      listBank({ language: this.language }),
      listDistrict({ language: this.language }),
    ])

    this.banks = banks
    this.districts = districts
  }

  ngOnInit() {
    void this.loadSelections()
  }
}

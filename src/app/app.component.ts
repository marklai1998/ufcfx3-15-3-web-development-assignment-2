import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { GoogleMap } from '@angular/google-maps'
import { District, listDistrict } from './services/listDistrict'
import { Bank, listBank } from './services/listBank'
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select'
import { Atm, listAtm } from './services/listAtm'
import { FormsModule } from '@angular/forms'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleMap,
    FormsModule,
    MatSelect,
    MatFormField,
    MatOption,
    MatLabel,
    MatInput,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Google map options
  options: google.maps.MapOptions = {
    center: { lat: 22.3316025, lng: 114.12776 },
    zoom: 12,
    clickableIcons: false,
    disableDefaultUI: true,
  }

  width = '100vw'
  height = '100vh'

  // API result
  banks: Bank[] = []
  districts: District[] = []
  atms: Atm[] = []

  // Filters
  selectedLanguage = 'en'
  selectedDistrict?: string = undefined
  searchAddress?: string = undefined
  selectedBank?: string = undefined

  async loadSelections() {
    const [{ banks }, { districts }] = await Promise.all([
      listBank({ language: this.selectedLanguage }),
      listDistrict({ language: this.selectedLanguage }),
    ])
    this.banks = banks
    this.districts = districts
  }

  async searchATM() {
    const { latest_record } = await listAtm({
      district: this.selectedDistrict,
      address: this.searchAddress,
      bankName: this.selectedBank,
      language: this.selectedLanguage,
    })

    this.atms = latest_record
  }

  ngOnInit() {
    void this.loadSelections()
    void this.searchATM()
  }
}

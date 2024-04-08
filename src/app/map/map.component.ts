import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { GoogleMap } from '@angular/google-maps'
import { FormsModule } from '@angular/forms'
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
} from '@angular/material/select'
import { MatInput } from '@angular/material/input'
import { MarkerComponent } from '../marker/marker.component'
import { CommonModule } from '@angular/common'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatButton, MatMiniFabButton } from '@angular/material/button'
import { listAtm } from '../services/listAtm'
import { Bank, listBank } from '../services/listBank'
import { District, listDistrict } from '../services/listDistrict'

@Component({
  selector: 'app-map',
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
    MarkerComponent,
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMiniFabButton,
    MatButton,
    RouterLink,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
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
  atms: {
    item_id: string
    position: {
      lat: number
      lng: number
    }
    detail: {
      type: string
      bankName: string
      serviceHour: string
      address: string
    }
  }[] = []

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

    this.atms = latest_record.map(
      ({
        item_id,
        latitude,
        longitude,
        type_of_machine,
        bank_name,
        service_hours,
        address,
      }) => ({
        item_id,
        position: { lat: Number(latitude), lng: Number(longitude) },
        detail: {
          type: type_of_machine,
          bankName: bank_name,
          serviceHour: service_hours,
          address: address,
        },
      })
    )
  }

  ngOnInit() {
    void this.loadSelections()
    void this.searchATM()
  }
}

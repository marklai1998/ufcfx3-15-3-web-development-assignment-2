import { Component, Input, ViewChild } from '@angular/core'
import { MapInfoWindow, MapMarker } from '@angular/google-maps'
import { Atm } from '../services/listAtm'

@Component({
  selector: 'app-marker',
  standalone: true,
  imports: [MapMarker, MapInfoWindow],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.css',
})
export class MarkerComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow

  @Input() position!: google.maps.LatLngLiteral
  @Input() atm!: {
    type: string
    bankName: string
    serviceHour: string
    address: string
  }

  options = {}

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker)
  }
}

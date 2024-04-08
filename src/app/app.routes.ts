import { Routes } from '@angular/router'
import { AdminComponent } from './admin/admin.component'
import { MapComponent } from './map/map.component'

export const routes: Routes = [
  { path: '', component: MapComponent },
  {
    path: 'admin',
    component: AdminComponent,
  },
]

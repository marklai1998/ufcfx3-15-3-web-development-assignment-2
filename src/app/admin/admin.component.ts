import { Component, OnInit } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

import { Atm, listAtm } from '../services/listAtm'
import { MatButtonToggleModule } from '@angular/material/button-toggle'

import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { deleteAtm } from '../services/deleteAtm'
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav'
import {
  CreateFormComponent,
  CreateFormValue,
} from '../create-form/create-form.component'
import { createAtm } from '../services/createAtm'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatButtonToggleModule,
    FormsModule,
    MatTableModule,
    MatDrawer,
    MatDrawerContainer,
    CreateFormComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  atms: Atm[] = []
  displayedColumns: string[] = [
    'id',
    'lat',
    'long',
    'district',
    'bankName',
    'type',
    'address',
    'serviceHours',
    'actions',
  ]

  selectedLanguage = 'en'
  createDrawerOpened = false

  async list() {
    const { latest_record } = await listAtm({
      language: this.selectedLanguage,
    })
    this.atms = latest_record
  }

  async delete(id: string) {
    await deleteAtm({ id })
    await this.list()
  }

  openCreateDrawer() {
    this.createDrawerOpened = true
  }

  onCreateDrawerClosed() {
    this.createDrawerOpened = false
  }

  ngOnInit() {
    void this.list()
  }

  async handleCreate({
    latitude,
    longitude,
    district,
    bank,
    type,
    serviceHours,
    address,
  }: CreateFormValue) {
    await createAtm(this.selectedLanguage, {
      latitude: String(latitude),
      longitude: String(longitude),
      district,
      bank_name: bank,
      type_of_machine: type,
      address,
      service_hours: serviceHours,
    })
    this.createDrawerOpened = false
  }
}

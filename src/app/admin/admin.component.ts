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

  ngOnInit() {
    void this.list()
  }
}

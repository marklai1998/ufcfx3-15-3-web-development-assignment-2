import { Component, Input, OnInit } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatOption } from '@angular/material/autocomplete'
import { MatSelect } from '@angular/material/select'
import { Bank, listBank } from '../services/listBank'
import { District, listDistrict } from '../services/listDistrict'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
    MatButtonModule,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent implements OnInit {
  @Input() language!: string

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

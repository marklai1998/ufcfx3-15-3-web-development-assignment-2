import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatOption } from '@angular/material/autocomplete'
import { MatSelect } from '@angular/material/select'
import { Bank, listBank } from '../services/listBank'
import { District, listDistrict } from '../services/listDistrict'
import { MatButtonModule } from '@angular/material/button'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgIf } from '@angular/common'
import { Atm } from '../services/listAtm'

export type CreateFormValue = {
  latitude: number
  longitude: number
  district: string
  bank: string
  type: string
  address: string
  serviceHours: string
}

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent implements OnInit {
  @Input() language!: string
  @Input() initialValue?: Atm
  @Output() onSubmit: EventEmitter<any> = new EventEmitter()

  createForm!: FormGroup

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
    this.createForm = new FormGroup({
      latitude: new FormControl(
        this.initialValue?.latitude,
        Validators.required
      ),
      longitude: new FormControl(
        this.initialValue?.longitude,
        Validators.required
      ),
      district: new FormControl(
        this.initialValue?.district,
        Validators.required
      ),
      bank: new FormControl(this.initialValue?.bank_name, Validators.required),
      type: new FormControl(
        this.initialValue?.type_of_machine,
        Validators.required
      ),
      address: new FormControl(this.initialValue?.address, Validators.required),
      serviceHours: new FormControl(
        this.initialValue?.service_hours,
        Validators.required
      ),
    })

    void this.loadSelections()
  }

  get latitude() {
    return this.createForm.get('latitude')
  }

  get longitude() {
    return this.createForm.get('longitude')
  }

  get district() {
    return this.createForm.get('district')
  }

  get bank() {
    return this.createForm.get('bank')
  }

  get type() {
    return this.createForm.get('type')
  }

  get address() {
    return this.createForm.get('address')
  }

  get serviceHours() {
    return this.createForm.get('serviceHours')
  }

  get isInvalid() {
    return this.createForm.invalid
  }

  handleSubmit() {
    this.onSubmit.emit(this.createForm.getRawValue())
  }
}

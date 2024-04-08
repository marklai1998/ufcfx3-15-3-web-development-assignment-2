import { Component } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-create-drawer',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './create-drawer.component.html',
  styleUrl: './create-drawer.component.css',
})
export class CreateDrawerComponent {}

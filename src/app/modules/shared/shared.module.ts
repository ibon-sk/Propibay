import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PropertyCardComponent,
    MenuComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    PropertyCardComponent,
    MenuComponent
  ]
})
export class SharedModule { }

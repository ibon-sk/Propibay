import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PropertyCardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    PropertyCardComponent,
    MenuComponent
  ]
})
export class SharedModule { }

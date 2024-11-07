import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    OfferCardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OfferCardComponent,
    MenuComponent
  ]
})
export class SharedModule { }

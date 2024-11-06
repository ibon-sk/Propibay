import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferCardComponent } from './components/offer-card/offer-card.component';

@NgModule({
  declarations: [
    OfferCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OfferCardComponent
  ]
})
export class SharedModule { }

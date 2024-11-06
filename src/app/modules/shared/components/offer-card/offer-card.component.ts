import { Input, Output, EventEmitter, Component } from "@angular/core";
import { Offer } from "../../models/offer";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent {
  @Input() offer!: Offer;
  @Output() offerSelected = new EventEmitter<Offer>();



  selectOffer() {
    this.offerSelected.emit(this.offer);
  }
} 

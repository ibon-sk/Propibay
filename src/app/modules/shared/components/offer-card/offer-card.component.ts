import { Input, Output, EventEmitter, Component } from "@angular/core";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent {
  @Input() offer: any;
  @Output() offerSelected = new EventEmitter<any>();

  selectOffer() {
    this.offerSelected.emit(this.offer);
  }
} 

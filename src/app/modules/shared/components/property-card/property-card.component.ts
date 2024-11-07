import { Input, Output, EventEmitter, Component } from "@angular/core";
import { Property } from "../../models/property";

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @Output() propertySelected = new EventEmitter<Property>();

  selectOffer() {
    this.propertySelected.emit(this.property);
  }
} 

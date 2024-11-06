import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.component.html",
  styleUrls: ["./edit-offer.component.scss"],
})
export class EditOfferComponent {
  offerForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    propertyType: ['', [Validators.required]],
    listingType: ['', [Validators.required]],
    rooms: [1, [Validators.required, Validators.min(1)]],
    bathrooms: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(1000)]]
  });
  propertyTypes: string[] = ['Casa', 'Apartamento', 'Condominio'];
  listingTypes: string[] = ['Venta', 'Alquiler'];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.offerForm.valid) {
      console.log(this.offerForm.value);
    }
  }

  onSearchLocation() {
    console.log("Search location");
  }

  searchLocation(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    // Procesa el valor como necesites
  }

  onDelete() {
    console.log("Delete offer");
  }
}
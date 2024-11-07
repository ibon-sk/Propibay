import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PropertyController } from "../../controllers/property.controller";
import { Location } from '@angular/common';

@Component({
  selector: "app-edit-property",
  templateUrl: "./edit-property.component.html",
  styleUrls: ["./edit-property.component.scss"],
})
export class EditPropertyComponent {
  offerForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    type: ['', [Validators.required]],
    offerType: ['', [Validators.required]],
    extension: [100, [Validators.required, Validators.min(100)]],
    rooms: [1, [Validators.required, Validators.min(1)]],
    baths: ['', [Validators.required]],
    price: [1000, [Validators.required, Validators.min(1000)]]
  });
  propertyTypes: string[] = [];
  listingTypes: string[] = [];

  constructor(private fb: FormBuilder, 
    private controller: PropertyController,
    private location: Location
  ) {}

  onSubmit() {
    this.offerForm.markAllAsTouched();
    if (this.offerForm.valid) {
      // Enviar datos al controlador
    }
  }

  goBack() {
    this.location.back();
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
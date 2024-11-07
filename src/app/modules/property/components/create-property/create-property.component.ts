import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyController } from '../../controllers/property.controller';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder, 
    private controller: PropertyController,
    private location: Location
  ) {}

  ngOnInit(): void { }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.offerForm.markAllAsTouched();
    if (this.offerForm.valid) {
      // Enviar datos al controlador
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
}

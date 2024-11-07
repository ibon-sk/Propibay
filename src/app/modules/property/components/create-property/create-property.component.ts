import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  offerForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    propertyType: ['', [Validators.required]],
    listingType: ['', [Validators.required]],
    rooms: [0, [Validators.required]],
    bathrooms: [0, [Validators.required]],
    price: [0, [Validators.required]]
  });
  propertyTypes: string[] = ['Casa', 'Apartamento', 'Condominio'];
  listingTypes: string[] = ['Venta', 'Alquiler'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { }

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
}

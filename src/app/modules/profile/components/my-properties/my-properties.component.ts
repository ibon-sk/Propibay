import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/modules/shared/models/property";
import { Location } from '@angular/common';
import { ProfileController } from "../../controllers/profile.controller";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-properties",
  templateUrl: "./my-properties.component.html",
  styleUrls: ["./my-properties.component.scss"],
})
export class MyPropertiesComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  searchQuery = '';
  email = localStorage.getItem('email') || '';

  constructor(
    private router: Router, 
    private controller: ProfileController,
    private location: Location
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email') || '';
    this.controller.getMyApartments(email).then((response) => {
      this.properties = response;
      this.filteredProperties = this.properties;
      console.log(this.filteredProperties);
    });
  }

  searchOffers(): void {
    this.filteredProperties = this.properties.filter(property =>
      property.titulo === null || property.titulo?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.descripcion === null ||property.descripcion?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goToEditProperty(propertyId: number | undefined) {
    this.router.navigate(['/edit-property', propertyId]);
  }

  goBack() {
    this.location.back();
  }

  deleteProperty(propertyId: number) {
    this.properties = this.properties.filter((p) => p.id !== propertyId);
  }
}
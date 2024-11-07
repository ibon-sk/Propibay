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
  properties: Property[] = [
    {
      id: 1,
      image: undefined,
      title: 'Casa en la playa',
      description: 'Casa con vista al mar',
      type: 1,
      offerType: 1,
      extension: 100,
      rooms: 3,
      baths: 2,
      price: 100000,
    }
  ];
  filteredProperties: Property[] = [];
  searchQuery = '';

  constructor(
    private router: Router, 
    private controller: ProfileController,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.filteredProperties = this.properties;
  }

  searchOffers(): void {
    this.filteredProperties = this.properties.filter(property =>
      property.title === null || property.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.description === null ||property.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
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
import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/modules/shared/models/property";
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

  constructor(private router: Router, private controller: ProfileController) {}

  ngOnInit(): void {
  }

  searchOffers(): void {
    this.filteredProperties = this.properties.filter(property =>
      property.title === null || property.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.description === null ||property.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  deleteProperty(propertyId: number) {
    this.properties = this.properties.filter((p) => p.id !== propertyId);
  }
}
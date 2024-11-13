import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/modules/shared/models/property";
import { Location } from '@angular/common';
import { ProfileController } from "../../controllers/profile.controller";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-favourites",
  templateUrl: "./my-favourites.component.html",
  styleUrls: ["./my-favourites.component.scss"],
})
export class MyFavouritesComponent implements OnInit {
  favourites: Property[] = [];
  filteredFavourites: Property[] = [];
  searchQuery = '';

  constructor(
    private router: Router, 
    private controller: ProfileController,
    private location: Location
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email') || '';
    this.controller.getFavourites(email).then((response: any) => {
      this.favourites = response;
      this.filteredFavourites = this.favourites;
    });
  }

  addFavourite(newFavourite: Property) {
      this.favourites.push(newFavourite);
  }

  goToProperty(propertyId: number | undefined) {
    this.router.navigate(['/property', propertyId]);
  }

  goBack() {
    this.location.back();
  }

  searchOffers(): void {
    this.filteredFavourites = this.favourites.filter(property =>
      property.titulo === null || property.titulo?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.descripcion === null ||property.descripcion?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
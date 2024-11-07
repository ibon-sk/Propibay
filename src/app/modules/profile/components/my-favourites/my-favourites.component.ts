import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/modules/shared/models/property";
import { ProfileController } from "../../controllers/profile.controller";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-favourites",
  templateUrl: "./my-favourites.component.html",
  styleUrls: ["./my-favourites.component.scss"],
})
export class MyFavouritesComponent implements OnInit {
  favourites: Property[] = [
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
  filteredFavourites: Property[] = [];
  searchQuery = '';

  constructor(private router: Router, private controller: ProfileController) {}

  ngOnInit(): void {
    this.filteredFavourites = this.favourites;
  }

  addFavourite(newFavourite: Property) {
      this.favourites.push(newFavourite);
  }

  goToProperty(propertyId: number | undefined) {
    this.router.navigate(['/property', propertyId]);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  searchOffers(): void {
    this.filteredFavourites = this.favourites.filter(property =>
      property.title === null || property.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.description === null ||property.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
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
  favourites: Property[] = [];
  filteredFavourites: Property[] = [];
  searchQuery = '';

  constructor(private router: Router, private controller: ProfileController) {}

  ngOnInit(): void {
  }

  addFavourite(newFavourite: Property) {
      this.favourites.push(newFavourite);
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
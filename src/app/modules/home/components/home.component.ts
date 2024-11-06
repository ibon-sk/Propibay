import { Component, OnInit } from '@angular/core';
import { HomeController } from '../controllers/home.controller';
import { Offer } from '../../shared/models/offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredOffers: Offer[] = [];  
  offers: Offer[] = [];
  searchQuery = '';  

  constructor(private controller: HomeController) {}

  ngOnInit(): void {
    this.controller.getProperties().subscribe((offers: any[]) => {
      this.offers = offers;
      this.filteredOffers = offers;
    });
  }

  searchOffers(): void {
    this.filteredOffers = this.offers.filter(offer =>
      offer.title === null || offer.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      offer.description === null ||offer.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log(this.filteredOffers, this.searchQuery);
  }
}

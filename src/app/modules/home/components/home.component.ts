import { Component, OnInit } from '@angular/core';
import { HomeController } from '../controllers/home.controller';
import { Property } from '../../shared/models/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredProperties: Property[] = [];  
  properties: Property[] = [];
  searchQuery = '';  

  constructor(private controller: HomeController) {}

  ngOnInit(): void {
    this.controller.getProperties().subscribe((properties: any[]) => {
      this.properties = properties;
      this.filteredProperties = properties;
    });
  }

  searchOffers(): void {
    this.filteredProperties = this.properties.filter(property =>
      property.title === null || property.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.description === null ||property.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

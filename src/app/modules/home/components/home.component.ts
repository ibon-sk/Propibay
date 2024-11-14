import { Component, OnInit } from '@angular/core';
import { HomeController } from '../controllers/home.controller';
import { Property } from '../../shared/models/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredProperties: Property[] = [];  
  properties: Property[] = [];
  searchQuery = '';  
  email = localStorage.getItem('email') || '';

  constructor(private controller: HomeController, private router: Router) {}

  ngOnInit(): void {
    this.controller.getProperties().then((properties: Property[]) => {
      this.properties = properties;
      this.filteredProperties = properties;
    }).catch(() => {
      console.log('Error getting properties');
    });
  }

  goPropertyPage(propertyId: number): void {
    this.router.navigate([`/property/${propertyId}`]);
  }

  searchOffers(): void {
    this.filteredProperties = this.properties.filter(property =>
      property.titulo === null || property.titulo?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      property.descripcion === null ||property.descripcion?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

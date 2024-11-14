import { Component, OnInit } from '@angular/core';
import { HomeController } from '../controllers/home.controller';
import { Property } from '../../shared/models/property';
import { Router } from '@angular/router';
import { PropertyFilter } from '../../shared/models/property-filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredProperties: Property[] = [];  
  properties: Property[] = [];
  orderType = -1;
  email = localStorage.getItem('email') || '';
  filters : PropertyFilter = {
    precioMin: undefined,
    precioMax: undefined,
    extension: undefined,
    nHabitaciones: undefined,
    estado: undefined,
    tipoInmueble: -1,
    tipoOferta: -1,
    ordenarPrecioMax: false,
    ordenarPrecioMin: false,
    ordenarFavoritos: false
  };

  constructor(private controller: HomeController, private router: Router) {}

  ngOnInit(): void {
    this.controller.getProperties().then((properties: Property[]) => {
      this.properties = properties;
      this.filteredProperties = properties;
    }).catch((error) => {
      console.log('Error getting properties', error);
      this.properties = [];
      this.filteredProperties = [];
    });
  }

  goPropertyPage(propertyId: number): void {
    this.router.navigate([`/property/${propertyId}`]);
  }

  applyFilters(): void {
    this.searchOffers();
  }

  searchOffers(): void {
    this.filters.tipoInmueble = parseInt(this.filters.tipoInmueble as any);
    this.filters.tipoOferta = parseInt(this.filters.tipoOferta as any);
    this.setOrderParameter();
    if (this.filters?.tipoInmueble < 0) this.filters.tipoInmueble = undefined;
    if (this.filters?.tipoOferta < 0) this.filters.tipoOferta = undefined;
    this.controller.getPropertiesByFilter(this.filters).then((filteredProperties) => {
      this.filteredProperties = filteredProperties;
    });
    this.resetFilters();
  }

  setOrderParameter() {
    this.filters.ordenarPrecioMin = false;
    this.filters.ordenarPrecioMax = false;

    this.orderType = parseInt(this.orderType as any);
    switch (this.orderType) {
      case 0:
        this.filters.ordenarPrecioMin = true;
        break;
      case 1:
        this.filters.ordenarPrecioMax = true;
        break;
      default: break;
    }
  }

  resetFilters() {
    this.filters = {
      precioMin: undefined,
      precioMax: undefined,
      extension: undefined,
      nHabitaciones: undefined,
      estado: undefined,
      tipoInmueble: this.filters.tipoInmueble === undefined ? -1 : this.filters.tipoInmueble,
      tipoOferta: this.filters.tipoOferta === undefined ? -1 : this.filters.tipoOferta,
      ordenarPrecioMax: false,
      ordenarPrecioMin: false,
      ordenarFavoritos: false
    } 
  }
}

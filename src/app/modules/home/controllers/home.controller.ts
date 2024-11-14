import { Injectable } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PropertyFilter } from '../../shared/models/property-filter';

@Injectable({
    providedIn: 'root'
  })
export class HomeController {

  constructor(private readonly service: HomeService) {}

  getProperties() {
    return this.service.getProperties();
  }

  getPropertiesByFilter(filter: PropertyFilter) {
    return this.service.getPropertiesByFilter(filter);
  }
}

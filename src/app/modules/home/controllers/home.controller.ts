import { Injectable } from '@angular/core';
import { HomeService } from '../services/home.service';

@Injectable({
    providedIn: 'root'
  })
export class HomeController {

  constructor(private readonly service: HomeService) {}

  getProperties() {
    return this.service.getProperties();
  }
}

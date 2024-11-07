import { Injectable } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Property } from '../../shared/models/property';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class HomeController {

  constructor(private readonly service: HomeService) {}

  getProperties(): Observable<Property[]> {
    return this.service.getProperties();
  }
  
}

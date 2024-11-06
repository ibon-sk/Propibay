import { Injectable } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Offer } from '../../shared/models/offer';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class HomeController {

  constructor(private readonly service: HomeService) {}

  getProperties(): Observable<Offer[]> {
    return this.service.getProperties();
  }
}

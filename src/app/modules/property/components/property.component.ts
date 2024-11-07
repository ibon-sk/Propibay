import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { Property } from '../../shared/models/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  
  property: Property = {
    id: 2,
    image: undefined,
    title: 'Casa en alquiler',
    description: 'Casa en alquiler en la colonia Condesa',
    type: 2,
    offerType: 2,
    rooms: 4,
    baths: 3,
    price: 15000,
  };

  constructor(
    private router: Router, 
    private controller: PropertyController,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}

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
  
  property: Property | undefined;

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { Property } from '../../shared/models/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  
  property!: Property;

  constructor(
    private router: Router, 
    private controller: PropertyController,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.controller.getProperty(+id).subscribe((property: Property) => {
        this.property = property;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  createChatAndNavigate() {
    // Crear el chat con el propietario de la propiedad
    this.router.navigate(['/chat']);
  }

  addToFavourites() {
    if (this.property.id !== undefined) {
          this.controller.addToFavourites('', this.property.id);
    }
  }
}

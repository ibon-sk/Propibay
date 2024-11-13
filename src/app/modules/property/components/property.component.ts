import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { Property } from '../../shared/models/property';
import { MatDialog } from '@angular/material/dialog';
import { PropertyMapComponent } from './property-map/property-map.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  
  public property: Property = {
    titulo: '',
    descripcion: '',
    precio: 0,
    ubicacion: '',
    imagenes: [],
    tipo_propiedad: 1,
    habitaciones: 0,
    estado: 1,
    id: 0,
    propietario_email: '',
    extension: 0,
    tipo_oferta: 1
  };

  constructor(
    private router: Router, 
    private controller: PropertyController,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.controller.getProperty(+id).then((property: Property) => {
        this.property = property;
      });
    }
  }

  openMapModal() {
    this.dialog.open(PropertyMapComponent, {
      width: '80%',
      height: '80%',
      data: { location: this.property.ubicacion }
    });
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

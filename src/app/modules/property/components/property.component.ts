import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { Property } from '../../shared/models/property';
import { MatDialog } from '@angular/material/dialog';
import { PropertyMapComponent } from './property-map/property-map.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  
  public isFavourite = false;
  public isOwner = false;
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
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const email = localStorage.getItem('email') || '';
    if (id !== null) {
      this.controller.getProperty(+id).then((property: Property) => {
        this.property = property;
        this.isOwner = this.property.propietario_email === email;
      });
      this.controller.checkFavourite(email, +id).then((result: any) => {
        this.isFavourite = result.isFavorito;
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

  createOffer() {
    // Crear una oferta para la propiedad
  }

  goBack() {
    this.location.back();
  }

  navigateToEdit() {
    this.router.navigate(['/edit-property', this.property.id]);
  }

  createChatAndNavigate() {
    // Crear el chat con el propietario de la propiedad
    this.router.navigate(['/chat']);
  }

  addToFavourites() {
    if (this.property.id !== undefined) {
      const email = localStorage.getItem('email') || '';
      this.controller.addToFavourites(email, this.property.id).then(() => {
        this.isFavourite = true;      
        this.snack.open('Propiedad añadida a favoritos', 'Cerrar', {
          duration: 3000,
        });
      });

    }
  }

  removeFromFavourites() {
    if (this.property.id !== undefined) {
      const email = localStorage.getItem('email') || '';
      this.controller.removeFromFavourites(email, this.property.id).then(() => {
        this.snack.open('Propiedad eliminada de favoritos', 'Cerrar', {
          duration: 3000,
        });
        this.isFavourite = false;
      });
    }
  }
}

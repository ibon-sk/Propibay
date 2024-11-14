import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { Property } from '../../shared/models/property';
import { MatDialog } from '@angular/material/dialog';
import { PropertyMapComponent } from './property-map/property-map.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirstMessageModalComponent } from '../../shared/components/first-message-modal/first-message-modal.component';
import { Chat } from '../../shared/models/chat';
import { ChatController } from '../../chat/controllers/chat.controller';
import { OfferController } from '../../offer/controllers/offer.controller';
import { OfferModalComponent } from '../../shared/components/offer-modal/offer-modal.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  
  public isFavourite = false;
  public isOwner = false;
  public email = localStorage.getItem('email') || '';
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
    private chatController: ChatController,
    private offerController: OfferController,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.controller.getProperty(+id).then((property: Property) => {
        this.property = property;
        this.isOwner = this.property.propietario_email === this.email;
      });
      this.controller.checkFavourite(this.email, +id).then((result: any) => {
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
    const dialogRef = this.dialog.open(OfferModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(amount => {
      if (amount) {
        const offer = {
          id_oferta: 0,
          cliente_email: this.email,
          propiedad_id: this.property.id,
          dinero_oferta: amount
        }
        this.offerController.createOffer(offer).then(() => {
          this.snack.open('Oferta enviada', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  navigateToEdit() {
    this.router.navigate(['/edit-property', this.property.id]);
  }

  createChatAndNavigate() {
    const dialogRef = this.dialog.open(FirstMessageModalComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(chat => {
      if (chat) {
        const email = localStorage.getItem('email') || '';
        const message: Chat = {
          id: Date.now(),
          chat: chat,
          fecha: new Date().toISOString(),
          cliente_email: email,
          cliente_email2: this.property.propietario_email,
          isSentByUser: true
        };
  
        this.chatController.sendMessage(message).then(() => {
          this.router.navigate(['/chat']);
        });
      }
    });
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';  
import { FirstMessageModalComponent } from './components/first-message-modal/first-message-modal.component';
import { OfferModalComponent } from './components/offer-modal/offer-modal.component';

@NgModule({
  declarations: [
    PropertyCardComponent,
    UserCardComponent,
    MenuComponent,
    DeleteModalComponent,
    FirstMessageModalComponent,
    OfferModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports: [
    PropertyCardComponent,
    UserCardComponent,
    MenuComponent,
    FirstMessageModalComponent,
    OfferModalComponent
  ]
})
export class SharedModule { }

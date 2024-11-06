import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileImageUrl: string = 'assets/images/unknown.png'; 
  username: string = 'Lorenzo Sierra';
  isEditing: boolean = false;
  isUsernameEmpty: boolean = false;

  constructor(private router: Router) {}

  validateUsername() {
    this.isUsernameEmpty = !this.username.trim();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveUsername() {
    this.validateUsername();
    if (!this.isUsernameEmpty) {
      //TODO: Agregar la lógica para guardar el nombre
      this.isEditing = false;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
        //TODO: Agregar lógica para subir la imagen al servidor
        console.log('Imagen de perfil actualizada');
      };
      reader.readAsDataURL(file);
    }
  }

  manageApartments() {
    //TODO: Agregar lógica para gestionar apartamentos
    console.log('Gestionar Apartamentos');
  }

  viewFavoritesHistory() {
    //TODO: Agregar lógica para gestionar favoritos
    console.log('Historial de Favoritos');
  }

  logout() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
    

  deleteAccount() {
    //TODO: Agregar lógica para eliminar la cuenta
    this.router.navigate(['/login']);
  }
}

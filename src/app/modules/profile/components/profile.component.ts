import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileController } from '../controllers/profile.controller';
import { User } from '../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = 'assets/images/unknown.png'; 
  user!: User;
  email: string = '';
  fullName: string = '';
  isEditing: boolean = false;
  isUsernameEmpty: boolean = false;

  constructor(
    private router: Router, 
    private controller: ProfileController, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    this.controller.getProfile(this.email).then((response: any) => {
      this.user = response;
      this.fullName = response.nombre + ' ' + response.apellidos;
    });
  }

  validateUsername() {
    this.isUsernameEmpty = !this.fullName.trim();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveUsername() {
    this.validateUsername();
    if (!this.isUsernameEmpty) {
      const nameParts = this.fullName.split(' ');
      this.user.nombre = nameParts[0];
      this.user.apellidos = nameParts.slice(1).join(' ');
      this.controller.updateProfile(this.user);
      this.isEditing = false;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      // Subir la foto
    }
  }

  manageApartments() {
    this.router.navigate(['/profile/my-properties']);
  }

  viewFavoritesHistory() {
    this.router.navigate(['/profile/my-favourites']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  } 

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.logout();
    });
  }
}

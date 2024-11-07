import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileController } from '../controllers/profile.controller';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = 'assets/images/unknown.png'; 
  user: User | undefined;
  email: string = '';
  fullName: string = '';
  isEditing: boolean = false;
  isUsernameEmpty: boolean = false;

  constructor(
    private router: Router, 
    private controller: ProfileController, 
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.email = this.userService.getEmail();
    this.controller.getProfile(this.email).subscribe((response: any) => {
      this.user = response;
      this.profileImageUrl = response.profileImageUrl;
      this.fullName = response.name + ' ' + response.lastName;
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
    }
  }

  manageApartments() {
    this.router.navigate(['/profile/my-properties']);
  }

  viewFavoritesHistory() {
    this.router.navigate(['/profile/my-favourites']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  } 

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.removeItem('authToken');
        this.userService.reset();
        this.router.navigate(['/login']);
      }
    });
  }
}

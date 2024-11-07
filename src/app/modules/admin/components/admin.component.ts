import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AdminController } from '../controllers/admin.controller';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private router: Router, private controller: AdminController) { }

  manageUsers() {
    this.router.navigate(['/admin/users']);
  }

  manageProperties() {
    this.router.navigate(['/admin/properties']);
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/login']);
  } 

}

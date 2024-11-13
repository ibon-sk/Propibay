import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminController } from "../../controllers/admin.controller";
import { MatDialog } from "@angular/material/dialog";
import { User } from "src/app/modules/shared/models/user";
import { DeleteModalComponent } from "src/app/modules/shared/components/delete-modal/delete-modal.component";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
})
export class AdminUsersComponent implements OnInit {
    filteredUsers: User[] = [];  
    users: User[] = [];
    searchQuery = ''; 
    
    constructor(
      private router: Router, 
      private controller: AdminController,
      private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        // Get all users
    }

    searchUsers(): void {
        this.filteredUsers = this.users.filter(user =>
            user.email === null || user.email?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.apellidos === null || user.apellidos?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.nombre === null || user.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    } 

    goBack() {
        this.router.navigate(["/admin"]);
    }

    delete(email: string | undefined): void {
      const dialogRef = this.dialog.open(DeleteModalComponent);
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed && email !== undefined) {
          this.controller.blockUser(email).subscribe(() => {
            this.users = this.users.filter(user => user.email !== email);
            this.searchUsers();
          });
        }
      });
    }
}
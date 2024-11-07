import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminController } from "../../controllers/admin.controller";
import { MatDialog } from "@angular/material/dialog";
import { DeleteModalComponent } from "src/app/modules/shared/components/delete-modal/delete-modal.component";
import { Property } from "src/app/modules/shared/models/property";

@Component({
  selector: "app-admin-properties",
  templateUrl: "./admin-properties.component.html",
  styleUrls: ["./admin-properties.component.scss"],
})
export class AdminPropertiesComponent implements OnInit {
    filteredProperties: Property[] = [];  
    properties: Property[] = [];
    searchQuery = ''; 
    
    constructor(
      private router: Router, 
      private controller: AdminController,
      private dialog: MatDialog) {}

    ngOnInit(): void {
      // Get all properties
    }

    searchOffers(): void {
      this.filteredProperties = this.properties.filter(property =>
        property.title === null || property.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        property.description === null ||property.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    goBack() {
        this.router.navigate(["/admin"]);
    }

    delete(propertyId: number | undefined): void {
      const dialogRef = this.dialog.open(DeleteModalComponent);
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          // Delete the property
        }
      });
    }
}
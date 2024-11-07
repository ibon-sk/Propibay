import { Injectable } from "@angular/core";
import { AdminService } from "../services/admin.service";

@Injectable({
    providedIn: "root",
})
export class AdminController {

    constructor(private service: AdminService) {}

    getAllUsers() {
        return this.service.getAllUsers();
    }

    blockUser(email: string) {
        return this.service.blockUser(email);
    }

    getAdmin(email: string) {
        return this.service.getAdmin(email);
    }
}

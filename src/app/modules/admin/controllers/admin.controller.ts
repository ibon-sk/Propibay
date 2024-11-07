import { Injectable } from "@angular/core";
import { AdminService } from "../services/admin.service";

@Injectable({
    providedIn: "root",
})
export class AdminController {

    constructor(private service: AdminService) {}
}

import { Injectable } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { User } from "../../shared/models/user";

@Injectable({
    providedIn: 'root'
})
export class ProfileController {

    constructor(private service: ProfileService) { }

    getProfile(email: string) {
        return this.service.getProfile(email);
    }

    updateProfile(user: User) {
        return this.service.updateProfile(user);
    }

    getMyApartments(email: string) {
        return this.service.getMyApartments(email);
    }

    getFavourites(email: string) {
        return this.service.getFavourites(email);
    }

}

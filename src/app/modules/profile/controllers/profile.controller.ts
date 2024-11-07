import { Injectable } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { User } from "../../shared/models/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfileController {

    constructor(private service: ProfileService) { }

    getProfile(email: string): Observable<any> {
        return this.service.getProfile(email);
    }

    updateProfile(user: User): Observable<any> {
        return this.service.updateProfile(user);
    }

}

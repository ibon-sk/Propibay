import { Injectable } from "@angular/core";
import { PropertyService } from "../services/property.service";
import { Property } from "../../shared/models/property";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PropertyController {

    constructor(private service: PropertyService) {}

    getProperty(id: number): Observable<Property> {
        return this.service.getProperty(id);
    }

    addToFavourites(email: string, propertyId: number) {
        this.service.addToFavourites(email, propertyId);
    }

}

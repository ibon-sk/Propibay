import { Injectable } from "@angular/core";
import { PropertyService } from "../services/property.service";
import { Property } from "../../shared/models/property";

@Injectable({
    providedIn: "root",
})
export class PropertyController {

    constructor(private service: PropertyService) {}

    getProperty(id: number) {
        return this.service.getProperty(id);
    }

    createProperty(property: Property) {
        return this.service.createProperty(property);
    }

    updateProperty(property: Property) {
        return this.service.updateProperty(property);
    }

    deleteProperty(id: number) {
        return this.service.deleteProperty(id);
    }

    addToFavourites(email: string, propertyId: number) {
        return this.service.addToFavourites(email, propertyId);
    }

    checkFavourite(email: string, propertyId: number) {
        return this.service.checkFavourite(email, propertyId);
    }

    removeFromFavourites(email: string, propertyId: number) {
        return this.service.removeFromFavourites(email, propertyId);
    }

    createOffer(offerer: string, owner: string, propertyId: number, offer: number) {
        return this.service.createOffer(offerer, owner, propertyId, offer);
    }

}

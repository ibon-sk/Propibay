import { Injectable } from "@angular/core";
import { OfferService } from "../services/offer.service";
import { Offer } from "../../shared/models/offer";

@Injectable({
  providedIn: "root"
})
export class OfferController {

    constructor(private service: OfferService) { }

    getOffersByClient(email: string) {
        return this.service.getOffersByClient(email);
    }

    getOffersByOwner(email: string) {
        return this.service.getOffersByOwner(email);
    }

    createOffer(offer: Offer) {
        return this.service.createOffer(offer);
    }

    updateOffer(offer: Offer) {
        return this.service.updateOffer(offer);
    }

    deleteOffer(offerId: number) {
        return this.service.deleteOffer(offerId);
    }

    createSell(owner: string, offerer: string, property_id: number, price: number) {
        return this.service.createSell(owner, offerer, property_id, price);
    }
}
import { Component, OnInit } from "@angular/core";
import { OfferController } from "../controllers/offer.controller";
import { Offer } from "../../shared/models/offer";
import { PropertyController } from "../../property/controllers/property.controller";
import { Property } from "../../shared/models/property";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
})
export class OffersComponent implements OnInit {

    sentOffers: Offer[] = [];
    receivedOffers: Offer[] = [];
    properties: { [id: number]: Property } = {};
    email = localStorage.getItem("email") || '';

    constructor(
        private controller: OfferController,
        private propertyController: PropertyController
    ) {}

    ngOnInit(): void {
        this.controller.getOffersByClient(this.email).then((offers) => {
            this.sentOffers = offers;
            for (let offer of this.sentOffers) {
                this.propertyController.getProperty(offer.propiedad_id).then((property: any) => {
                    this.properties[offer.propiedad_id] = property
                });
            }
        });
        this.controller.getOffersByOwner(this.email).then((offers) => {
            this.receivedOffers = offers;
            for (let offer of this.receivedOffers) {
                if (!this.properties[offer.propiedad_id]) {
                    this.propertyController.getProperty(offer.propiedad_id).then((property: any) => {
                        this.properties[offer.propiedad_id] = property;
                    });
                }
            }
        });
    }

    acceptOffer(offer: Offer) {
        const offerer = offer.cliente_email;
        const property_id = offer.propiedad_id;
        const price = offer.dinero_oferta;
        this.controller.createSell(this.email, offerer, property_id, price).then(() => {
            this.deleteOffer(offer);
        });
    }

    deleteOffer(offer: Offer) {
        this.controller.deleteOffer(offer.id_oferta).then(() => {
            this.sentOffers = this.sentOffers.filter((o) => o.id_oferta !== offer.id_oferta);
            this.receivedOffers = this.receivedOffers.filter((o) => o.id_oferta !== offer.id_oferta);
        });
    }
}

import { Component } from "@angular/core";
import { Property } from "src/app/modules/shared/models/property";
import { ProfileController } from "../../controllers/profile.controller";
import { Route } from "@angular/router";

@Component({
  selector: "app-my-properties",
  templateUrl: "./my-properties.component.html",
  styleUrls: ["./my-properties.component.scss"],
})
export class MyPropertiesComponent {
  properties: Property[] = [
    {
      id: 1,
      image: undefined,
      title: "Casa en la playa",
      description: "Casa de 3 habitaciones frente al mar",
      type: 1,
      offerType: 2,
      rooms: 3,
      baths: 2,
      price: 100000,
    },
    {
      id: 2,
      image: undefined,
      title: "Apartamento en la ciudad",
      description: "Apartamento de 2 habitaciones en el centro",
      type: 1,
      offerType: 1,
      rooms: 2,
      baths: 1,
      price: 800,
    },
  ];

  constructor(private route: Route, private controller: ProfileController) {}

  deleteProperty(propertyId: number) {
    this.properties = this.properties.filter((p) => p.id !== propertyId);
  }
}
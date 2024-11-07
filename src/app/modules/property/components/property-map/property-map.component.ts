import { Component } from "@angular/core";
import { Route } from "@angular/router";
import { PropertyController } from "../../controllers/property.controller";

@Component({
  selector: "app-property-map",
  templateUrl: "./property-map.component.html",
  styleUrls: ["./property-map.component.scss"],
})
export class PropertyMapComponent {
  lat = 51.678418;
  lng = 7.809007;

  constructor(private route: Route, private controller: PropertyController) {}
}
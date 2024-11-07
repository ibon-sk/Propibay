import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PropertyController } from "../../controllers/property.controller";

@Component({
  selector: "app-property-map",
  templateUrl: "./property-map.component.html",
  styleUrls: ["./property-map.component.scss"],
})
export class PropertyMapComponent {

  constructor(private router: Router, private controller: PropertyController) {}
}
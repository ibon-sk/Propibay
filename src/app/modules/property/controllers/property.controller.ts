import { Injectable } from "@angular/core";
import { PropertyService } from "../services/property.service";

@Injectable({
    providedIn: "root",
})
export class PropertyController {

    constructor(private service: PropertyService) {}
}

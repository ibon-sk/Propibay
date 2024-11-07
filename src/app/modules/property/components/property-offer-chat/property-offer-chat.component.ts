import { Component } from "@angular/core";
import { Route } from "@angular/router";
import { PropertyController } from "../../controllers/property.controller";

@Component({
  selector: "app-property-offer-chat",
  templateUrl: "./property-offer-chat.component.html",
  styleUrls: ["./property-offer-chat.component.scss"],
})
export class PropertyOfferChatComponent {
  messages: string[] = [
    "Hola, estoy interesado en tu propiedad",
    "¿Podrías darme más información?",
    "¿Cuál es el precio?",
  ];
  newMessage = "";

  constructor(private route: Route, private controller: PropertyController) {}

  sendMessage() {
    if (this.newMessage) {
      this.messages.push(this.newMessage);
      this.newMessage = "";
    }
  }
}
import { Injectable } from "@angular/core";
import { ChatService } from "../services/chat.service";

@Injectable({
    providedIn: 'root'
})
export class ChatController {

    constructor(private service: ChatService) {}
}

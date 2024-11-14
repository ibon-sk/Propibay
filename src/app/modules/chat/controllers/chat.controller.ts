import { Injectable } from "@angular/core";
import { ChatService } from "../services/chat.service";
import { Chat } from "../../shared/models/chat";

@Injectable({
    providedIn: 'root'
})
export class ChatController {

    constructor(private service: ChatService) {}

    getMessages(email: string) {
        return this.service.getMessages(email);
    }
    
    sendMessage(message: Chat) {
        return this.service.sendMessage(message);
    }
}

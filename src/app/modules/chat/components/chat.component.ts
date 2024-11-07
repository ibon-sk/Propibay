import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatController } from "../controllers/chat.controller";

interface Message {
    content: string;
    isSentByUser: boolean;
  }
  
  interface Chat {
    name: string;
    messages: Message[];
  }

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
    
    chats: Chat[] = [
        { name: 'Lorenzo Sierra Verdés', messages: [
                { content: 'Hola', isSentByUser: false },
                { content: 'Hola', isSentByUser: true },
                { content: 'Qué tal?', isSentByUser: false },
                { content: 'Bien y tú', isSentByUser: true },
                { content: 'Bien, a cuanto el piso?', isSentByUser: false },
            ] 
        },
        { name: 'Maximiliano López de Urriengorrieta', messages: [{ content: '¿Qué tal?', isSentByUser: true }] },
    ];
    selectedChat?: Chat;
    newMessage: string = '';

    constructor(private router: Router, private controller: ChatController) {}
    
    ngOnInit(): void {
        this.selectedChat = this.chats[0];
    }
    
    selectChat(chat: Chat) {
        this.selectedChat = chat;
    }
    
    sendMessage() {
        if (this.newMessage.trim()) {
          this.selectedChat?.messages.push({ content: this.newMessage, isSentByUser: true });
          this.newMessage = '';
        }
      }

}

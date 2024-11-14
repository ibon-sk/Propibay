import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChatController } from "../controllers/chat.controller";
import { Chat } from "../../shared/models/chat";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
    
    chats: { [key: string]: Chat[] } = {};
    selectedChat: string = '';
    newMessage: string = '';
    

    constructor(private router: Router, private controller: ChatController) {}
    
    ngOnInit(): void {
      const email = localStorage.getItem('email') || '';
      this.controller.getMessages(email).then((messages: any) => {
        this.chats = messages.reduce((acc: { [key: string]: Chat[] }, message: Chat) => {
          const otherEmail = message.cliente_email === email ? message.cliente_email2 : message.cliente_email;
          if (!acc[otherEmail]) {
            acc[otherEmail] = [];
          }
          message.isSentByUser = message.cliente_email === email;
          acc[otherEmail].push(message);
          return acc;
        }, {});
        const users = this.getUsers();
        if (users.length > 0) {
          this.selectedChat = users[0];
        }
      });
    }

    getUsers(): string[] {
      return Object.keys(this.chats);
    }
    
    selectChat(user: string) {
      this.selectedChat = user;
    }
    
    sendMessage() {
      if (this.newMessage.trim() && this.selectedChat) {
        const email = localStorage.getItem('email') || '';
        const message: Chat = {
          id: Date.now(),
          chat: this.newMessage,
          fecha: new Date().toISOString(),
          cliente_email: email,
          cliente_email2: this.selectedChat,
          isSentByUser: true
        };
        this.newMessage = '';
        this.controller.sendMessage(message).then(() => {
          this.chats[this.selectedChat].push(message);
        });
      }
    }

}

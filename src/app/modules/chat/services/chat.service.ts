import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../shared/constants';
import { Chat } from '../../shared/models/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    
    constructor(private http: HttpClient) {}

    getMessages(email: string) {
        return this.http.get(`${API.ROOT}${API.CHATS}/${email}`).toPromise();
    }

    sendMessage(message: Chat) {
        const body = {
            Cliente_Email: message.cliente_email, 
            Cliente_Email2: message.cliente_email2, 
            Chat: message.chat,
        }

        return this.http.post(`${API.ROOT}${API.CHATS}`, body).toPromise();
    }
}

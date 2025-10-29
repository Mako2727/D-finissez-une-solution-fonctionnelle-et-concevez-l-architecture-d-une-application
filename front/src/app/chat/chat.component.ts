import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: any[] = [];
  newMessage: string = '';
  conversationId: number = 1;
  expediteurType: string = 'UTILISATEUR'; // valeur par défaut

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => this.messages.push(msg));
  }

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    const msg = {
      contenu: this.newMessage,
      expediteurType: this.expediteurType,
      conversation: { id: this.conversationId }
    };

    this.chatService.sendMessage(msg);
    this.newMessage = '';
  }
}
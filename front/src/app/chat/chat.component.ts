import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './service/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages: any[] = [];
  newMessage: string = '';
  conversationId: number = 1;

  selectedExpediteurNom: string = '';
  selectedExpediteurType: string = '';

  private sub!: Subscription;

  constructor(private chatService: ChatService, private router: Router) {}

private subscription: any;

ngOnInit() {
  this.selectedExpediteurNom = localStorage.getItem('nom') || '';
  this.selectedExpediteurType = localStorage.getItem('role') || '';

  this.chatService.connect();

  if (!this.subscription) {
    this.subscription = this.chatService.messages$.subscribe(msg => this.messages.push(msg));
  }
}

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    const msg = {
      contenu: this.newMessage,
      expediteurNom: this.selectedExpediteurNom,
      expediteurType: this.selectedExpediteurType,
      conversation: { id: this.conversationId }
    };

    this.chatService.sendMessage(msg);
    this.newMessage = '';
  }

  logout() {
    localStorage.removeItem('nom');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
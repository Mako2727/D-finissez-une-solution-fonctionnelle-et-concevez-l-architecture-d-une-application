import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { ExpediteurService, Expediteur } from './expediteur.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any[] = [];
  newMessage: string = '';
  conversationId: number = 1;

 
  expediteurs: Expediteur[] = [];
  selectedExpediteurId!: number;      
  selectedExpediteurNom: string = ''; 
  selectedExpediteurType: string = '';

  constructor(
    private chatService: ChatService,
    private expediteurService: ExpediteurService
  ) {}

  selectedExpediteur!: { nom: string; type: string };

  ngOnInit() {
   
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => this.messages.push(msg));

   
    this.expediteurService.getExpediteurs().subscribe(data => {
      this.expediteurs = data;

     
      if (this.expediteurs.length > 0) {
        this.selectedExpediteurId = this.expediteurs[0].id;
        this.updateExpediteur();
      }
    });
  }

updateExpediteur() {
  if (!this.selectedExpediteur) return;

  this.selectedExpediteurNom = this.selectedExpediteur.nom;
  this.selectedExpediteurType = this.selectedExpediteur.type;

 
}


  sendMessage() {
    if (this.newMessage.trim() === '') return;

    try {
    

      const msg = {
        contenu: this.newMessage,
        expediteurType: this.selectedExpediteurType,
        expediteurNom: this.selectedExpediteurNom,
        conversation: { id: this.conversationId }
      };

      this.chatService.sendMessage(msg);
      this.newMessage = '';
    } catch (error) {
      
    }
  }
}
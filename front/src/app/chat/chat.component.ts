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

  // Variables pour gérer l'expéditeur
  expediteurs: Expediteur[] = [];
  selectedExpediteurId!: number;       // id sélectionné dans le select
  selectedExpediteurNom: string = '';  // nom lisible
  selectedExpediteurType: string = ''; // "UTILISATEUR" ou "SERVICE_CLIENT"

  constructor(
    private chatService: ChatService,
    private expediteurService: ExpediteurService
  ) {}

  selectedExpediteur!: { nom: string; type: string };
  
  ngOnInit() {
    // Connexion au WebSocket
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => this.messages.push(msg));

    // Récupération des expéditeurs depuis le backend
    this.expediteurService.getExpediteurs().subscribe(data => {
      this.expediteurs = data;

      // Initialiser le select avec le premier expéditeur disponible
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

  console.log(`✅ Expéditeur sélectionné : ${this.selectedExpediteurNom} (${this.selectedExpediteurType})`);
}

  // Envoi d'un message
  sendMessage() {
    if (this.newMessage.trim() === '') return;

    try {
      console.log(`📤 Envoi du message : "${this.newMessage}"`);
      console.log(`   Expéditeur : ${this.selectedExpediteurNom}`);
      console.log(`   Type       : ${this.selectedExpediteurType}`);
      console.log(`   Conversation ID : ${this.conversationId}`);

      const msg = {
        contenu: this.newMessage,
        expediteurType: this.selectedExpediteurType,
        expediteurNom: this.selectedExpediteurNom,
        conversation: { id: this.conversationId }
      };

      this.chatService.sendMessage(msg);
      this.newMessage = '';
    } catch (error) {
      console.error('⚠️ Une erreur est survenue lors de l’envoi du message :', error);
    }
  }
}
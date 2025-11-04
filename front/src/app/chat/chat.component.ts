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
  selectedExpediteurId: number = 0;
  selectedExpediteurType: string = 'UTILISATEUR'; // valeur par défaut

  constructor(
    private chatService: ChatService,
    private expediteurService: ExpediteurService
  ) {}

  ngOnInit() {
    // 1️⃣ Récupérer les expéditeurs via le service
    this.expediteurService.getExpediteurs().subscribe(data => {
      this.expediteurs = data;
      if (this.expediteurs.length > 0) {
        this.selectedExpediteurId = this.expediteurs[0].id;
        this.selectedExpediteurType = this.expediteurs[0].type;
      }
    });

    // 2️⃣ Connexion WebSocket
    this.chatService.connect();
    this.chatService.messages$.subscribe(msg => this.messages.push(msg));
  }

updateType() {
  const e = this.expediteurs.find(x => x.id === this.selectedExpediteurId);
  if (e) {
    this.selectedExpediteurType = e.nom + " ( " +e.type+" ) ";
    console.log('Expediteur sélectionné:', e.nom, e.type);
  }
}

sendMessage() {
  if (this.newMessage.trim() === '') return;

  const msg = {
    contenu: this.newMessage,
    expediteurId: this.selectedExpediteurId,
    expediteurType: this.selectedExpediteurType,
    conversation: { id: this.conversationId }
  };

  // 🔹 Log pour vérifier l’expéditeur
  console.log('Envoi du message avec expediteur:', msg.expediteurId, msg.expediteurType);

  this.chatService.sendMessage(msg);
  this.newMessage = '';
}
}
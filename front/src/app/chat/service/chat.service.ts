import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client | null = null;
  private messageSubject = new Subject<any>();
  public messages$ = this.messageSubject.asObservable();

  connect() {
    console.log('Tentative de connexion WebSocket...');
    const socket = new SockJS('http://localhost:8080/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, 
      debug: (str) => console.log('[STOMP DEBUG]', str)
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connecté au WebSocket !', frame);

      this.stompClient?.subscribe('/topic/messages', (msg: Message) => {
        console.log('Message reçu du serveur :', msg.body);
        this.messageSubject.next(JSON.parse(msg.body));
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erreur STOMP :', frame.headers['message']);
      console.error('Détails :', frame.body);
    };

    this.stompClient.onWebSocketError = (event) => {
      console.error('Erreur WebSocket :', event);
    };

    this.stompClient.onDisconnect = () => {
      console.warn('Déconnecté du WebSocket.');
    };

    this.stompClient.activate();
  }

sendMessage(message: any) {
  if (this.stompClient && this.stompClient.connected) {
    console.log('Envoi du message au serveur :', message);
    this.stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    });
  } else {
    console.warn('WebSocket non connecté, impossible d’envoyer le message.');
  }
}
}
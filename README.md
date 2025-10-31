Ce projet est un Proof of Concept (POC) illustrant un système de chat en temps réel entre un utilisateur et un service client.

Il repose sur une architecture moderne :  
🧠 Backend en Spring Boot (Java)  
⚡ Frontend en Angular  
🗄️ Base de données MySQL  
🔄 Communication temps réel via WebSocket (STOMP + SockJS)  

⚙️ Backend — Spring Boot  
🧱 Technologies  
☕ Java 17  
🌱 Spring Boot 3.x  
💾 Hibernate / JPA  
🧩 WebSocket (STOMP + SockJS)  
🐬 MySQL  
📦 Installation des dépendances  
mvn clean install  

🚀 Lancer le backend  
mvn spring-boot:run  

✅ Le backend démarre sur :  
http://localhost:8080  


💻 Frontend — Angular  
🧱 Technologies  
🔺 Angular 18  
🧠 TypeScript  
⚡ RxJS  
🎨 Bootstrap / Tailwind (selon setup)  
🔄 SockJS + STOMP.js pour les WebSockets  
📦 Installation des dépendances  
npm install  

🚀 Lancer le frontend  
ng serve  

✅ Le frontend démarre sur :  
http://localhost:4200  


Architecture générale  
┌────────────────────────────────────────────┐  
│                    Frontend (Angular)      │  
│  - chat.component.ts                       │  
│  - chat.service.ts                         │  
│  - websocket.service.ts                    │  
└────────────────────────────────────────────┘  
                │ REST / WebSocket  
                ▼  
┌────────────────────────────────────────────┐  
│                 Backend (Spring Boot)      │  
│  - MessageController                       │  
│  - ConversationController                  │  
│  - Services (MessageService, Conversation) │  
│  - WebSocketConfig                         │  
└────────────────────────────────────────────┘  
                │ JDBC  
                ▼  
┌────────────────────────────────────────────┐  
│                   MySQL                    │  
│  - Table `conversation`                    │  
│  - Table `message`                         │  
└────────────────────────────────────────────┘  
  
  

🧪 Exemple d’utilisation  
Démarrer une nouvelle conversation (POST /api/conversations)  
Envoyer un message depuis Angular en tant qu’utilisateur 👤  
Ouvrir une seconde fenêtre Angular et répondre en tant que service client 🧑‍💼  
Les deux interfaces échangent les messages en temps réel 🎯  
  
  
🔌 Endpoints REST  
Méthode	Endpoint	Description
GET	/api/conversations	Liste des conversations  
POST	/api/conversations	Crée une nouvelle conversation  
GET	/api/messages/conversation/{id}	Récupère les messages d’une conversation  
POST	/api/messages	Ajoute un message à une conversation  


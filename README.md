Ce projet est un Proof of Concept (POC) illustrant un système de chat en temps réel entre un utilisateur et un service client.

Il repose sur une architecture moderne :  
🧠 Backend en Spring Boot (Java)  
⚡ Frontend en Angular  
🗄️ Base de données MySQL  
🔄 Communication temps réel via WebSocket (STOMP + SockJS)  

⚙️ Backend — Spring Boot  
 Technologies  
 Java 17  
 Spring Boot 3.x  
 Hibernate / JPA  
 WebSocket   
 MySQL  
 
 Installation des dépendances  
mvn clean install  

🚀 Lancer le backend  
mvn spring-boot:run  

✅ Le backend démarre sur :  
http://localhost:8080  


💻 Frontend — Angular  
 Technologies  
 Angular 18  
 TypeScript  
 RxJS   
 SockJS + STOMP.js pour les WebSockets  
 
 Installation des dépendances  
npm install  

🚀 Lancer le frontend  
ng serve  

✅ Le frontend démarre sur :  
http://localhost:4200  


Architecture générale  
┌────────────────────────────────────────────┐  
│                    Frontend (Angular)      │  
│                                            │  
└────────────────────────────────────────────┘  
                │ REST / WebSocket  
                ▼  
┌────────────────────────────────────────────┐  
│                 Backend (Spring Boot)      │  
│                                            │  
└────────────────────────────────────────────┘  
                │ JDBC  
                ▼  
┌────────────────────────────────────────────┐  
│                   MySQL                    │  
│  - Table `conversation`                    │  
│  - Table `message`                         │  
└────────────────────────────────────────────┘  
  
  

🧪 Exemple d’utilisation  
Démarrer une nouvelle conversation  
->Se connecter en tant qu'utilisateur
Envoyer un message depuis Angular en tant qu’utilisateur 👤  

->Se connecter en tant que Service client
Ouvrir une seconde fenêtre Angular et répondre en tant que service client 🧑‍💼  
Les deux interfaces échangent les messages en temps réel 🎯  
  

🧪un script de création des tables se trouve dans 
\back\src\main\resources\sql\dump.sql

il vous faudra ensuite créer un utilisateur dans la table service_client et un autre dans la table utilisateur
-- Insertion dans la table utilisateur
INSERT INTO `utilisateur` (`nom`, `mot_de_passe`) VALUES
('marius', '$12$e42nmiITvUisipjMSVvygOtt5llyE2svTFRUU8lZ/9Nz/0h0OEDa6');


-- Insertion dans la table service_client
INSERT INTO `service_client` (`nom`, `mot_de_passe`) VALUES
('sClient', '$12$e42nmiITvUisipjMSVvygOtt5llyE2svTFRUU8lZ/9Nz/0h0OEDa6');


--Création de la conversation
INSERT INTO conversation (  date_creation,  statut,  service_client_id,  utilisateur_id) 
VALUES (  NOW(),  'OUVERT',  1,  1);


->ci-dessus (pour le test) le mot de passe en clair est "marius"


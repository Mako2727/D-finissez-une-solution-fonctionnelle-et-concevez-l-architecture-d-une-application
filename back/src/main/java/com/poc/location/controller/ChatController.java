package com.poc.location.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

import com.poc.location.model.Conversation;
import com.poc.location.model.Message;
import com.poc.location.service.ConversationService;
import com.poc.location.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.poc.location.service.MessageService;

public class ChatController {
    private final MessageService messageService;
    private final ConversationService conversationService;

    public ChatController(MessageService messageService, ConversationService conversationService) {
        this.messageService = messageService;
        this.conversationService = conversationService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message handleMessage(@Payload Message message) {
        // Récupère la conversation existante
        Conversation conv = conversationService.findById(message.getConversation().getId());
        if(conv == null) {
            throw new RuntimeException("Conversation introuvable avec id: " + message.getConversation().getId());
        }
        message.setConversation(conv);

        // Sauvegarde en BDD
        Message saved = messageService.save(message);
        System.out.println("Message reçu et sauvegardé : " + saved.getContenu());
        return saved;
    }
}

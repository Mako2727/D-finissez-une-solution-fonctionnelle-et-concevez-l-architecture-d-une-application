package com.poc.location.websocket;

import com.poc.location.model.Message;
import com.poc.location.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final MessageService messageService;

    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/chat") // endpoint pour envoyer les messages
    @SendTo("/topic/messages") // destination pour tous les abonnés
    public Message send(Message message) {
        return messageService.save(message);
    }
}
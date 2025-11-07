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

    
    Conversation conv = conversationService.findById(message.getConversation().getId());
    message.setConversation(conv);

    return messageService.save(message);
}
}

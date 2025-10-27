package com.poc.location.controller;

import com.poc.location.model.Message;
import com.poc.location.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/conversation/{conversationId}")
    public List<Message> getByConversation(@PathVariable Long conversationId) {
        return messageService.findByConversationId(conversationId);
    }

    @PostMapping
    public Message create(@RequestBody Message message) {
        return messageService.save(message);
    }
}

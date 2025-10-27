package com.poc.location.controller;

import com.poc.location.model.Conversation;
import com.poc.location.service.ConversationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public List<Conversation> getAll() {
        return conversationService.findAll();
    }

    @PostMapping
    public Conversation create(@RequestBody Conversation conversation) {
        return conversationService.save(conversation);
    }
}
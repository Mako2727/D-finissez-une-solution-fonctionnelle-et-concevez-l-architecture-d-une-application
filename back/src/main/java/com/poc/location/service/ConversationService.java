package com.poc.location.service;

import com.poc.location.model.Conversation;
import com.poc.location.repository.ConversationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public List<Conversation> findAll() {
        return conversationRepository.findAll();
    }

    public Conversation save(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public Conversation findById(Long id) {
        return conversationRepository.findById(id).orElse(null);
    }
}
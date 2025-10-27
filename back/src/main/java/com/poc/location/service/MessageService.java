package com.poc.location.service;

import com.poc.location.model.Message;
import com.poc.location.repository.MessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message save(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> findByConversationId(Long conversationId) {
        return messageRepository.findByConversationId(conversationId);
    }
}

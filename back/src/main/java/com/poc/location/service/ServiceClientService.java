package com.poc.location.service;

import com.poc.location.model.ServiceClient;
import com.poc.location.repository.ServiceClientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceClientService {

    private final ServiceClientRepository repository;

    public ServiceClientService(ServiceClientRepository repository) {
        this.repository = repository;
    }

    public List<ServiceClient> findAll() {
        return repository.findAll();
    }

    public ServiceClient findById(Long id) {
        return repository.findById(id).orElse(null);
    }
}

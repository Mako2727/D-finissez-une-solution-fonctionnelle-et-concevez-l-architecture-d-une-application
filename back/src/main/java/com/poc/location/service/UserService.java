package com.poc.location.service;

import org.springframework.stereotype.Service;
import com.poc.location.model.Utilisateur; 
import com.poc.location.repository.UtilisateurRepository;
import java.util.List;

@Service
public class UserService {

    private final UtilisateurRepository utilisateurRepository;

    public UserService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public Utilisateur findById(Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }
}

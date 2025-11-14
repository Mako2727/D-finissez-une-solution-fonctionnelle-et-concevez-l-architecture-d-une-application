package com.poc.location.service;

import com.poc.location.model.Utilisateur;
import com.poc.location.model.ServiceClient;
import com.poc.location.repository.UtilisateurRepository;
import com.poc.location.repository.ServiceClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ServiceClientRepository serviceClientRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
    public Utilisateur registerUtilisateur(String nom, String motDePasse) {
        Utilisateur u = new Utilisateur();
        u.setNom(nom);
        u.setMotDePasse(passwordEncoder.encode(motDePasse));
        return utilisateurRepository.save(u);
    }

    
    public ServiceClient registerServiceClient(String nom, String motDePasse) {
        ServiceClient s = new ServiceClient();
        s.setNom(nom);
        s.setMotDePasse(passwordEncoder.encode(motDePasse));
        return serviceClientRepository.save(s);
    }

   
    public boolean loginUtilisateur(String nom, String motDePasse) {
        Utilisateur u = utilisateurRepository.findByNom(nom);
        return u != null && passwordEncoder.matches(motDePasse, u.getMotDePasse());
    }

    public boolean loginServiceClient(String nom, String motDePasse) {
        ServiceClient s = serviceClientRepository.findByNom(nom);
        return s != null && passwordEncoder.matches(motDePasse, s.getMotDePasse());
    }
}
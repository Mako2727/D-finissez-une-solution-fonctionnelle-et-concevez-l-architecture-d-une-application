package com.poc.location.controller;

import com.poc.location.model.Utilisateur;
import com.poc.location.dto.LoginRequest;
import com.poc.location.model.ServiceClient;
import com.poc.location.service.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private AuthService authService;

   
    @PostMapping("/register/utilisateur")
    public Utilisateur registerUtilisateur(@RequestParam String nom, @RequestParam String motDePasse) {
        return authService.registerUtilisateur(nom, motDePasse);
    }

    @PostMapping("/register/service-client")
    public ServiceClient registerServiceClient(@RequestParam String nom, @RequestParam String motDePasse) {
        return authService.registerServiceClient(nom, motDePasse);
    }
@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
    System.out.println("Login reçu : " + loginRequest.getNom() + " / " + loginRequest.getMotDePasse());
    
    if (authService.loginUtilisateur(loginRequest.getNom(), loginRequest.getMotDePasse())) {
        return ResponseEntity.ok(Map.of("role", "CLIENT"));
    } else if (authService.loginServiceClient(loginRequest.getNom(), loginRequest.getMotDePasse())) {
        return ResponseEntity.ok(Map.of("role", "SERVICE_CLIENT"));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
}

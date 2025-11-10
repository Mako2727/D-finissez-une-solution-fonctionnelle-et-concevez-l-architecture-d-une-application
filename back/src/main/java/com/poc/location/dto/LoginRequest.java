package com.poc.location.dto;

public class LoginRequest {
    private String nom;
    private String motDePasse;

    // Constructeur vide (obligatoire pour Jackson)
    public LoginRequest() {}

    // Constructeur complet (optionnel)
    public LoginRequest(String nom, String motDePasse) {
        this.nom = nom;
        this.motDePasse = motDePasse;
    }

    // Getters et Setters
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}

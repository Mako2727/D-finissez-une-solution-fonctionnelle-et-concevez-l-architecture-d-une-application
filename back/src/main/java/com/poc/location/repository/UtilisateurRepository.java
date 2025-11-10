package com.poc.location.repository;

import com.poc.location.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // Méthode pour rechercher un utilisateur par nom
    Utilisateur findByNom(String nom);
}

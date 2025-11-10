package com.poc.location.repository;

import com.poc.location.model.ServiceClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceClientRepository extends JpaRepository<ServiceClient, Long> {
    // Méthode pour rechercher un service client par nom
    ServiceClient findByNom(String nom);
}

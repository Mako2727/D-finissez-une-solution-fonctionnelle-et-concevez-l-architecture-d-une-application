package com.poc.location.controller;

import org.springframework.web.bind.annotation.RestController;

import com.poc.location.service.ExpediteurService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpediteurController {

    private final ExpediteurService expediteurService;

    public ExpediteurController(ExpediteurService expediteurService) {
        this.expediteurService = expediteurService;
    }

    @GetMapping("/expediteurs")
    public List<Map<String, String>> getExpediteurs() {
        return expediteurService.getAllExpediteurs();
    }
}

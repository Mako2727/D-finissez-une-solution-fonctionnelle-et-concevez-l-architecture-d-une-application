package com.poc.location.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Service
public class ExpediteurService {

    private final UserService userService;
    private final ServiceClientService serviceClientService;

    public ExpediteurService(UserService userService, ServiceClientService serviceClientService) {
        this.userService = userService;
        this.serviceClientService = serviceClientService;
    }

    public List<Map<String, String>> getAllExpediteurs() {
        List<Map<String, String>> list = new ArrayList<>();

        userService.findAll().forEach(u -> {
            Map<String, String> map = new HashMap<>();
            map.put("id", String.valueOf(u.getId()));
            map.put("nom", u.getNom());
            map.put("type", "UTILISATEUR");
            list.add(map);
        });

        serviceClientService.findAll().forEach(sc -> {
            Map<String, String> map = new HashMap<>();
            map.put("id", String.valueOf(sc.getId()));
            map.put("nom", sc.getNom());
            map.put("type", "SERVICE_CLIENT");
            list.add(map);
        });

        return list;
    }
}
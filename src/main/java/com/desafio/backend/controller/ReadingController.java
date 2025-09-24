package com.desafio.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.backend.model.Reading;
import com.desafio.backend.repository.ReadingRepository;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*") // libera CORS para qualquer origem
public class ReadingController {

    private final ReadingRepository repository;

    public ReadingController(ReadingRepository repository) {
        this.repository = repository;
    }

    // Criar nova leitura
    @PostMapping
    public Reading create(@RequestBody Reading reading) {
        if (reading.getTimestamp() == null) {
            reading.setTimestamp(java.time.LocalDateTime.now());
        }
        return repository.save(reading);
    }

    // Buscar todas as leituras
    @GetMapping
    public List<Reading> getAll() {
        return repository.findAll();
    }

    // Buscar leituras por sensorId
    @GetMapping("/{sensorId}")
    public List<Reading> getBySensor(@PathVariable String sensorId) {
        return repository.findBySensorId(sensorId);
    }
}

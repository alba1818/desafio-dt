package com.desafio.backend.controller;

import com.desafio.backend.model.Reading;
import com.desafio.backend.repository.ReadingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*") // libera CORS para qualquer origem
public class ReadingController {

    private final ReadingRepository repository;

    public ReadingController(ReadingRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Reading create(@RequestBody Reading reading) {
        return repository.save(reading);
    }

    @GetMapping
    public List<Reading> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{sensorId}")
    public List<Reading> getBySensor(@PathVariable String sensorId) {
        return repository.findBySensorId(sensorId);
    }
}

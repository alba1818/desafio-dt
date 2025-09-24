package com.desafio.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desafio.backend.model.Reading;

public interface ReadingRepository extends JpaRepository<Reading, Long> {
    List<Reading> findBySensorId(String sensorId);
}

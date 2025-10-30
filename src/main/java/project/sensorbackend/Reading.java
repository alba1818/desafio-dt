package project.sensorbackend;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorId;
    private Double readingValue;
    private LocalDateTime timestamp;

    public Reading() {}

    public Reading(String sensorId, Double readingValue, LocalDateTime timestamp) {
    this.sensorId = sensorId;
    this.readingValue = readingValue;
    this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public Double getReadingValue() {
    return readingValue;
    }

    public void setReadingValue(Double readingValue) {
    this.readingValue = readingValue;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
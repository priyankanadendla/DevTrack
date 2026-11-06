package com.devtrack.dto.response;

import com.devtrack.entity.CodingProblem;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CodingProblemResponse {
    private Long id;
    private String problemName;
    private String platform;
    private String language;
    private String topic;
    private CodingProblem.Difficulty difficulty;
    private CodingProblem.Status status;
    private LocalDate solvedDate;
    private String problemUrl;
    private String notes;
    private String timeComplexity;
    private String spaceComplexity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CodingProblemResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProblemName() { return problemName; }
    public void setProblemName(String problemName) { this.problemName = problemName; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public CodingProblem.Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(CodingProblem.Difficulty difficulty) { this.difficulty = difficulty; }

    public CodingProblem.Status getStatus() { return status; }
    public void setStatus(CodingProblem.Status status) { this.status = status; }

    public LocalDate getSolvedDate() { return solvedDate; }
    public void setSolvedDate(LocalDate solvedDate) { this.solvedDate = solvedDate; }

    public String getProblemUrl() { return problemUrl; }
    public void setProblemUrl(String problemUrl) { this.problemUrl = problemUrl; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getTimeComplexity() { return timeComplexity; }
    public void setTimeComplexity(String timeComplexity) { this.timeComplexity = timeComplexity; }

    public String getSpaceComplexity() { return spaceComplexity; }
    public void setSpaceComplexity(String spaceComplexity) { this.spaceComplexity = spaceComplexity; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static CodingProblemResponse from(CodingProblem p) {
        CodingProblemResponse resp = new CodingProblemResponse();
        resp.setId(p.getId());
        resp.setProblemName(p.getProblemName());
        resp.setPlatform(p.getPlatform());
        resp.setLanguage(p.getLanguage());
        resp.setTopic(p.getTopic());
        resp.setDifficulty(p.getDifficulty());
        resp.setStatus(p.getStatus());
        resp.setSolvedDate(p.getSolvedDate());
        resp.setProblemUrl(p.getProblemUrl());
        resp.setNotes(p.getNotes());
        resp.setTimeComplexity(p.getTimeComplexity());
        resp.setSpaceComplexity(p.getSpaceComplexity());
        resp.setCreatedAt(p.getCreatedAt());
        resp.setUpdatedAt(p.getUpdatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final CodingProblemResponse resp = new CodingProblemResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder problemName(String problemName) { resp.setProblemName(problemName); return this; }
        public Builder platform(String platform) { resp.setPlatform(platform); return this; }
        public Builder language(String language) { resp.setLanguage(language); return this; }
        public Builder topic(String topic) { resp.setTopic(topic); return this; }
        public Builder difficulty(CodingProblem.Difficulty difficulty) { resp.setDifficulty(difficulty); return this; }
        public Builder status(CodingProblem.Status status) { resp.setStatus(status); return this; }
        public Builder solvedDate(LocalDate solvedDate) { resp.setSolvedDate(solvedDate); return this; }
        public Builder problemUrl(String problemUrl) { resp.setProblemUrl(problemUrl); return this; }
        public Builder notes(String notes) { resp.setNotes(notes); return this; }
        public Builder timeComplexity(String timeComplexity) { resp.setTimeComplexity(timeComplexity); return this; }
        public Builder spaceComplexity(String spaceComplexity) { resp.setSpaceComplexity(spaceComplexity); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { resp.setUpdatedAt(updatedAt); return this; }
        public CodingProblemResponse build() { return resp; }
    }
}

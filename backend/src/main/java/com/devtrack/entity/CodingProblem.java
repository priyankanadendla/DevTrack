package com.devtrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_problems")
@EntityListeners(AuditingEntityListener.class)
public class CodingProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "problem_name", nullable = false, length = 200)
    @NotBlank
    private String problemName;

    @Column(length = 50)
    private String platform;

    @Column(length = 50)
    private String language;

    @Column(length = 100)
    private String topic;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty = Difficulty.MEDIUM;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(name = "solved_date")
    private LocalDate solvedDate;

    @Column(name = "problem_url")
    private String problemUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "time_complexity", length = 50)
    private String timeComplexity;

    @Column(name = "space_complexity", length = 50)
    private String spaceComplexity;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public CodingProblem() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getProblemName() { return problemName; }
    public void setProblemName(String problemName) { this.problemName = problemName; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

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

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final CodingProblem item = new CodingProblem();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder problemName(String problemName) { item.setProblemName(problemName); return this; }
        public Builder platform(String platform) { item.setPlatform(platform); return this; }
        public Builder language(String language) { item.setLanguage(language); return this; }
        public Builder topic(String topic) { item.setTopic(topic); return this; }
        public Builder difficulty(Difficulty difficulty) { item.setDifficulty(difficulty); return this; }
        public Builder status(Status status) { item.setStatus(status); return this; }
        public Builder solvedDate(LocalDate solvedDate) { item.setSolvedDate(solvedDate); return this; }
        public Builder problemUrl(String problemUrl) { item.setProblemUrl(problemUrl); return this; }
        public Builder notes(String notes) { item.setNotes(notes); return this; }
        public Builder timeComplexity(String timeComplexity) { item.setTimeComplexity(timeComplexity); return this; }
        public Builder spaceComplexity(String spaceComplexity) { item.setSpaceComplexity(spaceComplexity); return this; }
        public CodingProblem build() { return item; }
    }

    public enum Difficulty {
        EASY, MEDIUM, HARD
    }

    public enum Status {
        PENDING, SOLVED, REVISIT
    }
}

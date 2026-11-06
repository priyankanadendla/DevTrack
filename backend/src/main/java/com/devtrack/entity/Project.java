package com.devtrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@EntityListeners(AuditingEntityListener.class)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "project_name", nullable = false, length = 200)
    @NotBlank
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "tech_stack", length = 500)
    private String techStack;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "completion_date")
    private LocalDate completionDate;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_PROGRESS;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Project() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDate completionDate) { this.completionDate = completionDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Project item = new Project();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder projectName(String projectName) { item.setProjectName(projectName); return this; }
        public Builder description(String description) { item.setDescription(description); return this; }
        public Builder techStack(String techStack) { item.setTechStack(techStack); return this; }
        public Builder githubUrl(String githubUrl) { item.setGithubUrl(githubUrl); return this; }
        public Builder liveUrl(String liveUrl) { item.setLiveUrl(liveUrl); return this; }
        public Builder startDate(LocalDate startDate) { item.setStartDate(startDate); return this; }
        public Builder completionDate(LocalDate completionDate) { item.setCompletionDate(completionDate); return this; }
        public Builder status(Status status) { item.setStatus(status); return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { item.setThumbnailUrl(thumbnailUrl); return this; }
        public Builder notes(String notes) { item.setNotes(notes); return this; }
        public Project build() { return item; }
    }

    public enum Status {
        PLANNING, IN_PROGRESS, COMPLETED, ON_HOLD, CANCELLED
    }
}

package com.devtrack.dto.response;

import com.devtrack.entity.Project;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProjectResponse {
    private Long id;
    private String projectName;
    private String description;
    private String techStack;
    private String githubUrl;
    private String liveUrl;
    private LocalDate startDate;
    private LocalDate completionDate;
    private Project.Status status;
    private String thumbnailUrl;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ProjectResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public Project.Status getStatus() { return status; }
    public void setStatus(Project.Status status) { this.status = status; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ProjectResponse from(Project p) {
        ProjectResponse resp = new ProjectResponse();
        resp.setId(p.getId());
        resp.setProjectName(p.getProjectName());
        resp.setDescription(p.getDescription());
        resp.setTechStack(p.getTechStack());
        resp.setGithubUrl(p.getGithubUrl());
        resp.setLiveUrl(p.getLiveUrl());
        resp.setStartDate(p.getStartDate());
        resp.setCompletionDate(p.getCompletionDate());
        resp.setStatus(p.getStatus());
        resp.setThumbnailUrl(p.getThumbnailUrl());
        resp.setNotes(p.getNotes());
        resp.setCreatedAt(p.getCreatedAt());
        resp.setUpdatedAt(p.getUpdatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final ProjectResponse resp = new ProjectResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder projectName(String projectName) { resp.setProjectName(projectName); return this; }
        public Builder description(String description) { resp.setDescription(description); return this; }
        public Builder techStack(String techStack) { resp.setTechStack(techStack); return this; }
        public Builder githubUrl(String githubUrl) { resp.setGithubUrl(githubUrl); return this; }
        public Builder liveUrl(String liveUrl) { resp.setLiveUrl(liveUrl); return this; }
        public Builder startDate(LocalDate startDate) { resp.setStartDate(startDate); return this; }
        public Builder completionDate(LocalDate completionDate) { resp.setCompletionDate(completionDate); return this; }
        public Builder status(Project.Status status) { resp.setStatus(status); return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { resp.setThumbnailUrl(thumbnailUrl); return this; }
        public Builder notes(String notes) { resp.setNotes(notes); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { resp.setUpdatedAt(updatedAt); return this; }
        public ProjectResponse build() { return resp; }
    }
}

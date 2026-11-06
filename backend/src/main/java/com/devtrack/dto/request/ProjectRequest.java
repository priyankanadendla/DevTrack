package com.devtrack.dto.request;

import com.devtrack.entity.Project;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class ProjectRequest {

    @NotBlank(message = "Project name is required")
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

    public ProjectRequest() {}

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
}

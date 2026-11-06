package com.devtrack.dto.request;

import com.devtrack.entity.CodingProblem;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class CodingProblemRequest {

    @NotBlank(message = "Problem name is required")
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

    public CodingProblemRequest() {}

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
}

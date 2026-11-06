package com.devtrack.dto.request;

import com.devtrack.entity.DailyGoal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DailyGoalRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Goal date is required")
    private LocalDate goalDate;

    private LocalDateTime deadline;
    private DailyGoal.Priority priority;
    private String category;

    public DailyGoalRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getGoalDate() { return goalDate; }
    public void setGoalDate(LocalDate goalDate) { this.goalDate = goalDate; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public DailyGoal.Priority getPriority() { return priority; }
    public void setPriority(DailyGoal.Priority priority) { this.priority = priority; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}

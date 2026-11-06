package com.devtrack.dto.response;

import com.devtrack.entity.DailyGoal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DailyGoalResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate goalDate;
    private LocalDateTime deadline;
    private Boolean isCompleted;
    private LocalDateTime completedAt;
    private DailyGoal.Priority priority;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DailyGoalResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getGoalDate() { return goalDate; }
    public void setGoalDate(LocalDate goalDate) { this.goalDate = goalDate; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public DailyGoal.Priority getPriority() { return priority; }
    public void setPriority(DailyGoal.Priority priority) { this.priority = priority; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static DailyGoalResponse from(DailyGoal goal) {
        DailyGoalResponse resp = new DailyGoalResponse();
        resp.setId(goal.getId());
        resp.setTitle(goal.getTitle());
        resp.setDescription(goal.getDescription());
        resp.setGoalDate(goal.getGoalDate());
        resp.setDeadline(goal.getDeadline());
        resp.setIsCompleted(goal.getIsCompleted());
        resp.setCompletedAt(goal.getCompletedAt());
        resp.setPriority(goal.getPriority());
        resp.setCategory(goal.getCategory());
        resp.setCreatedAt(goal.getCreatedAt());
        resp.setUpdatedAt(goal.getUpdatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final DailyGoalResponse resp = new DailyGoalResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder title(String title) { resp.setTitle(title); return this; }
        public Builder description(String description) { resp.setDescription(description); return this; }
        public Builder goalDate(LocalDate goalDate) { resp.setGoalDate(goalDate); return this; }
        public Builder deadline(LocalDateTime deadline) { resp.setDeadline(deadline); return this; }
        public Builder isCompleted(Boolean isCompleted) { resp.setIsCompleted(isCompleted); return this; }
        public Builder completedAt(LocalDateTime completedAt) { resp.setCompletedAt(completedAt); return this; }
        public Builder priority(DailyGoal.Priority priority) { resp.setPriority(priority); return this; }
        public Builder category(String category) { resp.setCategory(category); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { resp.setUpdatedAt(updatedAt); return this; }
        public DailyGoalResponse build() { return resp; }
    }
}

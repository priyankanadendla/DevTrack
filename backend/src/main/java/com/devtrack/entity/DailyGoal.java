package com.devtrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_goals")
@EntityListeners(AuditingEntityListener.class)
public class DailyGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "goal_date", nullable = false)
    @NotNull
    private LocalDate goalDate;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @Column(length = 50)
    private String category;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public DailyGoal() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final DailyGoal item = new DailyGoal();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder title(String title) { item.setTitle(title); return this; }
        public Builder description(String description) { item.setDescription(description); return this; }
        public Builder goalDate(LocalDate goalDate) { item.setGoalDate(goalDate); return this; }
        public Builder deadline(LocalDateTime deadline) { item.setDeadline(deadline); return this; }
        public Builder isCompleted(Boolean isCompleted) { item.setIsCompleted(isCompleted); return this; }
        public Builder completedAt(LocalDateTime completedAt) { item.setCompletedAt(completedAt); return this; }
        public Builder priority(Priority priority) { item.setPriority(priority); return this; }
        public Builder category(String category) { item.setCategory(category); return this; }
        public DailyGoal build() { return item; }
    }

    public enum Priority {
        LOW, MEDIUM, HIGH
    }
}

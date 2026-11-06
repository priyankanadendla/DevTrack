package com.devtrack.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@EntityListeners(AuditingEntityListener.class)
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_type", nullable = false, length = 50)
    private String activityType;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate = LocalDate.now();

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "reference_id")
    private Long referenceId;

    @Column(name = "reference_type", length = 50)
    private String referenceType;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public ActivityLog() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }

    public LocalDate getActivityDate() { return activityDate; }
    public void setActivityDate(LocalDate activityDate) { this.activityDate = activityDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getReferenceId() { return referenceId; }
    public void setReferenceId(Long referenceId) { this.referenceId = referenceId; }

    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final ActivityLog item = new ActivityLog();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder activityType(String activityType) { item.setActivityType(activityType); return this; }
        public Builder activityDate(LocalDate activityDate) { item.setActivityDate(activityDate); return this; }
        public Builder description(String description) { item.setDescription(description); return this; }
        public Builder referenceId(Long referenceId) { item.setReferenceId(referenceId); return this; }
        public Builder referenceType(String referenceType) { item.setReferenceType(referenceType); return this; }
        public ActivityLog build() { return item; }
    }
}

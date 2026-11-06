package com.devtrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "skills", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skill_name"}))
@EntityListeners(AuditingEntityListener.class)
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "skill_name", nullable = false, length = 100)
    @NotBlank
    private String skillName;

    @Column(length = 50)
    private String category;

    @Column(name = "proficiency_level", nullable = false)
    @Min(0) @Max(100)
    private Integer proficiencyLevel = 0;

    @Column(name = "years_of_experience", precision = 4, scale = 1)
    private BigDecimal yearsOfExperience;

    @Column(name = "is_primary")
    private Boolean isPrimary = false;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Skill() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(Integer proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public BigDecimal getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(BigDecimal yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }

    public Boolean getIsPrimary() { return isPrimary; }
    public void setIsPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Skill item = new Skill();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder skillName(String skillName) { item.setSkillName(skillName); return this; }
        public Builder category(String category) { item.setCategory(category); return this; }
        public Builder proficiencyLevel(Integer proficiencyLevel) { item.setProficiencyLevel(proficiencyLevel); return this; }
        public Builder yearsOfExperience(BigDecimal yearsOfExperience) { item.setYearsOfExperience(yearsOfExperience); return this; }
        public Builder isPrimary(Boolean isPrimary) { item.setIsPrimary(isPrimary); return this; }
        public Builder notes(String notes) { item.setNotes(notes); return this; }
        public Skill build() { return item; }
    }
}

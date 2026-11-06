package com.devtrack.dto.response;

import com.devtrack.entity.Skill;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SkillResponse {
    private Long id;
    private String skillName;
    private String category;
    private Integer proficiencyLevel;
    private BigDecimal yearsOfExperience;
    private Boolean isPrimary;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SkillResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public static SkillResponse from(Skill skill) {
        SkillResponse resp = new SkillResponse();
        resp.setId(skill.getId());
        resp.setSkillName(skill.getSkillName());
        resp.setCategory(skill.getCategory());
        resp.setProficiencyLevel(skill.getProficiencyLevel());
        resp.setYearsOfExperience(skill.getYearsOfExperience());
        resp.setIsPrimary(skill.getIsPrimary());
        resp.setNotes(skill.getNotes());
        resp.setCreatedAt(skill.getCreatedAt());
        resp.setUpdatedAt(skill.getUpdatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final SkillResponse resp = new SkillResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder skillName(String skillName) { resp.setSkillName(skillName); return this; }
        public Builder category(String category) { resp.setCategory(category); return this; }
        public Builder proficiencyLevel(Integer proficiencyLevel) { resp.setProficiencyLevel(proficiencyLevel); return this; }
        public Builder yearsOfExperience(BigDecimal yearsOfExperience) { resp.setYearsOfExperience(yearsOfExperience); return this; }
        public Builder isPrimary(Boolean isPrimary) { resp.setIsPrimary(isPrimary); return this; }
        public Builder notes(String notes) { resp.setNotes(notes); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { resp.setUpdatedAt(updatedAt); return this; }
        public SkillResponse build() { return resp; }
    }
}

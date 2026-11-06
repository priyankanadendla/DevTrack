package com.devtrack.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class SkillRequest {

    @NotBlank(message = "Skill name is required")
    private String skillName;

    private String category;

    @Min(0) @Max(100)
    private Integer proficiencyLevel = 0;

    private BigDecimal yearsOfExperience;
    private Boolean isPrimary = false;
    private String notes;

    public SkillRequest() {}

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
}

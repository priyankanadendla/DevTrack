package com.devtrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@EntityListeners(AuditingEntityListener.class)
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "company_name", nullable = false, length = 100)
    @NotBlank
    private String companyName;

    @Column(name = "job_role", nullable = false, length = 100)
    @NotBlank
    private String jobRole;

    @Column(length = 100)
    private String location;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Status status = Status.APPLIED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "job_url")
    private String jobUrl;

    @Column(name = "contact_name", length = 100)
    private String contactName;

    @Column(name = "contact_email", length = 100)
    private String contactEmail;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public JobApplication() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDate applicationDate) { this.applicationDate = applicationDate; }

    public BigDecimal getSalaryMin() { return salaryMin; }
    public void setSalaryMin(BigDecimal salaryMin) { this.salaryMin = salaryMin; }

    public BigDecimal getSalaryMax() { return salaryMax; }
    public void setSalaryMax(BigDecimal salaryMax) { this.salaryMax = salaryMax; }

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getJobUrl() { return jobUrl; }
    public void setJobUrl(String jobUrl) { this.jobUrl = jobUrl; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final JobApplication item = new JobApplication();
        public Builder id(Long id) { item.setId(id); return this; }
        public Builder user(User user) { item.setUser(user); return this; }
        public Builder companyName(String companyName) { item.setCompanyName(companyName); return this; }
        public Builder jobRole(String jobRole) { item.setJobRole(jobRole); return this; }
        public Builder location(String location) { item.setLocation(location); return this; }
        public Builder applicationDate(LocalDate applicationDate) { item.setApplicationDate(applicationDate); return this; }
        public Builder salaryMin(BigDecimal salaryMin) { item.setSalaryMin(salaryMin); return this; }
        public Builder salaryMax(BigDecimal salaryMax) { item.setSalaryMax(salaryMax); return this; }
        public Builder jobDescription(String jobDescription) { item.setJobDescription(jobDescription); return this; }
        public Builder status(Status status) { item.setStatus(status); return this; }
        public Builder notes(String notes) { item.setNotes(notes); return this; }
        public Builder jobUrl(String jobUrl) { item.setJobUrl(jobUrl); return this; }
        public Builder contactName(String contactName) { item.setContactName(contactName); return this; }
        public Builder contactEmail(String contactEmail) { item.setContactEmail(contactEmail); return this; }
        public JobApplication build() { return item; }
    }

    public enum Status {
        APPLIED, ASSESSMENT, INTERVIEW, SELECTED, REJECTED
    }
}

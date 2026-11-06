package com.devtrack.dto.response;

import com.devtrack.entity.JobApplication;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class JobApplicationResponse {
    private Long id;
    private String companyName;
    private String jobRole;
    private String location;
    private LocalDate applicationDate;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String jobDescription;
    private JobApplication.Status status;
    private String notes;
    private String jobUrl;
    private String contactName;
    private String contactEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobApplicationResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public JobApplication.Status getStatus() { return status; }
    public void setStatus(JobApplication.Status status) { this.status = status; }

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

    public static JobApplicationResponse from(JobApplication job) {
        JobApplicationResponse resp = new JobApplicationResponse();
        resp.setId(job.getId());
        resp.setCompanyName(job.getCompanyName());
        resp.setJobRole(job.getJobRole());
        resp.setLocation(job.getLocation());
        resp.setApplicationDate(job.getApplicationDate());
        resp.setSalaryMin(job.getSalaryMin());
        resp.setSalaryMax(job.getSalaryMax());
        resp.setJobDescription(job.getJobDescription());
        resp.setStatus(job.getStatus());
        resp.setNotes(job.getNotes());
        resp.setJobUrl(job.getJobUrl());
        resp.setContactName(job.getContactName());
        resp.setContactEmail(job.getContactEmail());
        resp.setCreatedAt(job.getCreatedAt());
        resp.setUpdatedAt(job.getUpdatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final JobApplicationResponse resp = new JobApplicationResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder companyName(String companyName) { resp.setCompanyName(companyName); return this; }
        public Builder jobRole(String jobRole) { resp.setJobRole(jobRole); return this; }
        public Builder location(String location) { resp.setLocation(location); return this; }
        public Builder applicationDate(LocalDate applicationDate) { resp.setApplicationDate(applicationDate); return this; }
        public Builder salaryMin(BigDecimal salaryMin) { resp.setSalaryMin(salaryMin); return this; }
        public Builder salaryMax(BigDecimal salaryMax) { resp.setSalaryMax(salaryMax); return this; }
        public Builder jobDescription(String jobDescription) { resp.setJobDescription(jobDescription); return this; }
        public Builder status(JobApplication.Status status) { resp.setStatus(status); return this; }
        public Builder notes(String notes) { resp.setNotes(notes); return this; }
        public Builder jobUrl(String jobUrl) { resp.setJobUrl(jobUrl); return this; }
        public Builder contactName(String contactName) { resp.setContactName(contactName); return this; }
        public Builder contactEmail(String contactEmail) { resp.setContactEmail(contactEmail); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { resp.setUpdatedAt(updatedAt); return this; }
        public JobApplicationResponse build() { return resp; }
    }
}

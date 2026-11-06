package com.devtrack.service;

import com.devtrack.dto.request.JobApplicationRequest;
import com.devtrack.dto.response.JobApplicationResponse;
import com.devtrack.entity.ActivityLog;
import com.devtrack.entity.JobApplication;
import com.devtrack.entity.User;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.repository.ActivityLogRepository;
import com.devtrack.repository.JobApplicationRepository;
import com.devtrack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JobApplicationService {

    private static final Logger log = LoggerFactory.getLogger(JobApplicationService.class);

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository,
                                 UserRepository userRepository,
                                 ActivityLogRepository activityLogRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public JobApplicationResponse create(Long userId, JobApplicationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        JobApplication job = JobApplication.builder()
                .user(user)
                .companyName(request.getCompanyName())
                .jobRole(request.getJobRole())
                .location(request.getLocation())
                .applicationDate(request.getApplicationDate())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .jobDescription(request.getJobDescription())
                .status(request.getStatus() != null ? request.getStatus() : JobApplication.Status.APPLIED)
                .notes(request.getNotes())
                .jobUrl(request.getJobUrl())
                .contactName(request.getContactName())
                .contactEmail(request.getContactEmail())
                .build();

        JobApplication saved = jobApplicationRepository.save(job);
        logActivity(user, "JOB_APPLICATION_ADDED",
                "Applied to " + saved.getCompanyName() + " for " + saved.getJobRole(), saved.getId());
        return JobApplicationResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<JobApplicationResponse> getAll(Long userId, String search,
                                              JobApplication.Status status, Pageable pageable) {
        return jobApplicationRepository
                .findByUserIdWithFilters(userId, search, status, pageable)
                .map(JobApplicationResponse::from);
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getById(Long userId, Long id) {
        JobApplication job = jobApplicationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        return JobApplicationResponse.from(job);
    }

    @Transactional
    public JobApplicationResponse update(Long userId, Long id, JobApplicationRequest request) {
        JobApplication job = jobApplicationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));

        job.setCompanyName(request.getCompanyName());
        job.setJobRole(request.getJobRole());
        job.setLocation(request.getLocation());
        job.setApplicationDate(request.getApplicationDate());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setJobDescription(request.getJobDescription());
        if (request.getStatus() != null) job.setStatus(request.getStatus());
        job.setNotes(request.getNotes());
        job.setJobUrl(request.getJobUrl());
        job.setContactName(request.getContactName());
        job.setContactEmail(request.getContactEmail());

        return JobApplicationResponse.from(jobApplicationRepository.save(job));
    }

    @Transactional
    public void delete(Long userId, Long id) {
        JobApplication job = jobApplicationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        jobApplicationRepository.delete(job);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getStatusDistribution(Long userId) {
        List<Object[]> results = jobApplicationRepository.countByUserIdGroupByStatus(userId);
        Map<String, Long> distribution = new HashMap<>();
        for (Object[] row : results) {
            distribution.put(row[0].toString(), (Long) row[1]);
        }
        return distribution;
    }

    private void logActivity(User user, String type, String description, Long refId) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .activityType(type)
                .description(description)
                .referenceId(refId)
                .referenceType("JOB_APPLICATION")
                .build();
        activityLogRepository.save(log);
    }
}

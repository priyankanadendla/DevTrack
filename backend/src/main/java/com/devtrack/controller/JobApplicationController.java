package com.devtrack.controller;

import com.devtrack.dto.request.JobApplicationRequest;
import com.devtrack.dto.response.JobApplicationResponse;
import com.devtrack.entity.JobApplication;
import com.devtrack.security.UserPrincipal;
import com.devtrack.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping
    public ResponseEntity<JobApplicationResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody JobApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobApplicationService.create(principal.getId(), request));
    }

    @GetMapping
    public ResponseEntity<Page<JobApplicationResponse>> getAll(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) JobApplication.Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(jobApplicationService.getAll(principal.getId(), search, status, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getById(principal.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {
        return ResponseEntity.ok(jobApplicationService.update(principal.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        jobApplicationService.delete(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }
}

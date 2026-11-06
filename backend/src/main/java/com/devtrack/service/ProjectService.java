package com.devtrack.service;

import com.devtrack.dto.request.ProjectRequest;
import com.devtrack.dto.response.ProjectResponse;
import com.devtrack.entity.ActivityLog;
import com.devtrack.entity.Project;
import com.devtrack.entity.User;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.repository.ActivityLogRepository;
import com.devtrack.repository.ProjectRepository;
import com.devtrack.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository,
                          ActivityLogRepository activityLogRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public ProjectResponse create(Long userId, ProjectRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Project project = Project.builder()
                .user(user)
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .techStack(request.getTechStack())
                .githubUrl(request.getGithubUrl())
                .liveUrl(request.getLiveUrl())
                .startDate(request.getStartDate())
                .completionDate(request.getCompletionDate())
                .status(request.getStatus() != null ? request.getStatus() : Project.Status.IN_PROGRESS)
                .thumbnailUrl(request.getThumbnailUrl())
                .notes(request.getNotes())
                .build();

        Project saved = projectRepository.save(project);
        logActivity(user, "PROJECT_CREATED", "Created project: " + saved.getProjectName(), saved.getId());
        return ProjectResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<ProjectResponse> getAll(Long userId, String search, Project.Status status, Pageable pageable) {
        return projectRepository.findByUserIdWithFilters(userId, search, status, pageable)
                .map(ProjectResponse::from);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getById(Long userId, Long id) {
        return ProjectResponse.from(
                projectRepository.findByIdAndUserId(id, userId)
                        .orElseThrow(() -> new ResourceNotFoundException("Project not found"))
        );
    }

    @Transactional
    public ProjectResponse update(Long userId, Long id, ProjectRequest request) {
        Project project = projectRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        project.setProjectName(request.getProjectName());
        project.setDescription(request.getDescription());
        project.setTechStack(request.getTechStack());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setStartDate(request.getStartDate());
        project.setCompletionDate(request.getCompletionDate());
        if (request.getStatus() != null) project.setStatus(request.getStatus());
        project.setThumbnailUrl(request.getThumbnailUrl());
        project.setNotes(request.getNotes());

        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public void delete(Long userId, Long id) {
        Project project = projectRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        projectRepository.delete(project);
    }

    private void logActivity(User user, String type, String description, Long refId) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .activityType(type)
                .description(description)
                .referenceId(refId)
                .referenceType("PROJECT")
                .build();
        activityLogRepository.save(log);
    }
}

package com.devtrack.service;

import com.devtrack.dto.request.CodingProblemRequest;
import com.devtrack.dto.response.CodingProblemResponse;
import com.devtrack.entity.ActivityLog;
import com.devtrack.entity.CodingProblem;
import com.devtrack.entity.User;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.repository.ActivityLogRepository;
import com.devtrack.repository.CodingProblemRepository;
import com.devtrack.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CodingProblemService {

    private final CodingProblemRepository codingProblemRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public CodingProblemService(CodingProblemRepository codingProblemRepository,
                                UserRepository userRepository,
                                ActivityLogRepository activityLogRepository) {
        this.codingProblemRepository = codingProblemRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public CodingProblemResponse create(Long userId, CodingProblemRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CodingProblem problem = CodingProblem.builder()
                .user(user)
                .problemName(request.getProblemName())
                .platform(request.getPlatform())
                .language(request.getLanguage())
                .topic(request.getTopic())
                .difficulty(request.getDifficulty() != null ? request.getDifficulty() : CodingProblem.Difficulty.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : CodingProblem.Status.PENDING)
                .solvedDate(request.getSolvedDate())
                .problemUrl(request.getProblemUrl())
                .notes(request.getNotes())
                .timeComplexity(request.getTimeComplexity())
                .spaceComplexity(request.getSpaceComplexity())
                .build();

        CodingProblem saved = codingProblemRepository.save(problem);

        if (saved.getStatus() == CodingProblem.Status.SOLVED) {
            logActivity(user, "PROBLEM_SOLVED", "Solved: " + saved.getProblemName(), saved.getId());
        } else {
            logActivity(user, "PROBLEM_ADDED", "Added problem: " + saved.getProblemName(), saved.getId());
        }

        return CodingProblemResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<CodingProblemResponse> getAll(Long userId, String search,
                                             CodingProblem.Difficulty difficulty,
                                             CodingProblem.Status status,
                                             String topic,
                                             Pageable pageable) {
        return codingProblemRepository
                .findByUserIdWithFilters(userId, search, difficulty, status, topic, pageable)
                .map(CodingProblemResponse::from);
    }

    @Transactional(readOnly = true)
    public CodingProblemResponse getById(Long userId, Long id) {
        return CodingProblemResponse.from(
                codingProblemRepository.findByIdAndUserId(id, userId)
                        .orElseThrow(() -> new ResourceNotFoundException("Coding problem not found"))
        );
    }

    @Transactional
    public CodingProblemResponse update(Long userId, Long id, CodingProblemRequest request) {
        CodingProblem problem = codingProblemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Coding problem not found"));

        boolean wasSolved = problem.getStatus() == CodingProblem.Status.SOLVED;

        problem.setProblemName(request.getProblemName());
        problem.setPlatform(request.getPlatform());
        problem.setLanguage(request.getLanguage());
        problem.setTopic(request.getTopic());
        if (request.getDifficulty() != null) problem.setDifficulty(request.getDifficulty());
        if (request.getStatus() != null) problem.setStatus(request.getStatus());
        problem.setSolvedDate(request.getSolvedDate());
        problem.setProblemUrl(request.getProblemUrl());
        problem.setNotes(request.getNotes());
        problem.setTimeComplexity(request.getTimeComplexity());
        problem.setSpaceComplexity(request.getSpaceComplexity());

        CodingProblem saved = codingProblemRepository.save(problem);

        if (!wasSolved && saved.getStatus() == CodingProblem.Status.SOLVED) {
            User user = userRepository.findById(userId).orElseThrow();
            logActivity(user, "PROBLEM_SOLVED", "Solved: " + saved.getProblemName(), saved.getId());
        }

        return CodingProblemResponse.from(saved);
    }

    @Transactional
    public void delete(Long userId, Long id) {
        CodingProblem problem = codingProblemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Coding problem not found"));
        codingProblemRepository.delete(problem);
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getDifficultyDistribution(Long userId) {
        List<Object[]> results = codingProblemRepository.countByUserIdGroupByDifficulty(userId);
        Map<String, Long> distribution = new HashMap<>();
        for (Object[] row : results) {
            distribution.put(row[0].toString(), (Long) row[1]);
        }
        return distribution;
    }

    @Transactional(readOnly = true)
    public List<Object[]> getSolvingActivity(Long userId, LocalDate startDate) {
        return codingProblemRepository.countSolvedByUserIdGroupByDate(userId, startDate);
    }

    private void logActivity(User user, String type, String description, Long refId) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .activityType(type)
                .description(description)
                .referenceId(refId)
                .referenceType("CODING_PROBLEM")
                .build();
        activityLogRepository.save(log);
    }
}

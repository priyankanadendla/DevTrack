package com.devtrack.service;

import com.devtrack.dto.request.DailyGoalRequest;
import com.devtrack.dto.response.DailyGoalResponse;
import com.devtrack.entity.ActivityLog;
import com.devtrack.entity.DailyGoal;
import com.devtrack.entity.User;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.repository.ActivityLogRepository;
import com.devtrack.repository.DailyGoalRepository;
import com.devtrack.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DailyGoalService {

    private final DailyGoalRepository dailyGoalRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public DailyGoalService(DailyGoalRepository dailyGoalRepository,
                            UserRepository userRepository,
                            ActivityLogRepository activityLogRepository) {
        this.dailyGoalRepository = dailyGoalRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional
    public DailyGoalResponse create(Long userId, DailyGoalRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        DailyGoal goal = DailyGoal.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .goalDate(request.getGoalDate())
                .deadline(request.getDeadline())
                .priority(request.getPriority() != null ? request.getPriority() : DailyGoal.Priority.MEDIUM)
                .category(request.getCategory())
                .isCompleted(false)
                .build();

        return DailyGoalResponse.from(dailyGoalRepository.save(goal));
    }

    @Transactional(readOnly = true)
    public List<DailyGoalResponse> getByDate(Long userId, LocalDate date) {
        return dailyGoalRepository.findByUserIdAndGoalDateOrderByPriorityDesc(userId, date)
                .stream().map(DailyGoalResponse::from).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DailyGoalResponse> getAll(Long userId) {
        return dailyGoalRepository.findByUserIdOrderByGoalDateDescCreatedAtDesc(userId)
                .stream().map(DailyGoalResponse::from).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DailyGoalResponse getById(Long userId, Long id) {
        return DailyGoalResponse.from(
                dailyGoalRepository.findByIdAndUserId(id, userId)
                        .orElseThrow(() -> new ResourceNotFoundException("Goal not found"))
        );
    }

    @Transactional
    public DailyGoalResponse update(Long userId, Long id, DailyGoalRequest request) {
        DailyGoal goal = dailyGoalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        goal.setTitle(request.getTitle());
        goal.setDescription(request.getDescription());
        goal.setGoalDate(request.getGoalDate());
        goal.setDeadline(request.getDeadline());
        if (request.getPriority() != null) goal.setPriority(request.getPriority());
        goal.setCategory(request.getCategory());

        return DailyGoalResponse.from(dailyGoalRepository.save(goal));
    }

    @Transactional
    public DailyGoalResponse toggleComplete(Long userId, Long id) {
        DailyGoal goal = dailyGoalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));

        boolean nowCompleted = !goal.getIsCompleted();
        goal.setIsCompleted(nowCompleted);
        goal.setCompletedAt(nowCompleted ? LocalDateTime.now() : null);

        DailyGoal saved = dailyGoalRepository.save(goal);

        if (nowCompleted) {
            User user = userRepository.findById(userId).orElseThrow();
            ActivityLog log = ActivityLog.builder()
                    .user(user).activityType("GOAL_COMPLETED")
                    .description("Completed goal: " + goal.getTitle())
                    .referenceId(goal.getId()).referenceType("DAILY_GOAL").build();
            activityLogRepository.save(log);
        }

        return DailyGoalResponse.from(saved);
    }

    @Transactional
    public void delete(Long userId, Long id) {
        DailyGoal goal = dailyGoalRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));
        dailyGoalRepository.delete(goal);
    }
}

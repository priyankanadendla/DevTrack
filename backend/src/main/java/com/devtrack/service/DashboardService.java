package com.devtrack.service;

import com.devtrack.dto.response.DashboardStatsResponse;
import com.devtrack.entity.CodingProblem;
import com.devtrack.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final JobApplicationRepository jobApplicationRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final DailyGoalRepository dailyGoalRepository;
    private final JobApplicationService jobApplicationService;
    private final CodingProblemService codingProblemService;

    public DashboardService(JobApplicationRepository jobApplicationRepository,
                            CodingProblemRepository codingProblemRepository,
                            SkillRepository skillRepository,
                            ProjectRepository projectRepository,
                            DailyGoalRepository dailyGoalRepository,
                            JobApplicationService jobApplicationService,
                            CodingProblemService codingProblemService) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.codingProblemRepository = codingProblemRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.dailyGoalRepository = dailyGoalRepository;
        this.jobApplicationService = jobApplicationService;
        this.codingProblemService = codingProblemService;
    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats(Long userId) {
        long totalJobs = jobApplicationRepository.countByUserId(userId);
        long totalProblems = codingProblemRepository.countByUserId(userId);
        long solvedProblems = codingProblemRepository.countByUserIdAndStatus(userId, CodingProblem.Status.SOLVED);
        long totalSkills = skillRepository.countByUserId(userId);
        long totalProjects = projectRepository.countByUserId(userId);
        long totalGoals = dailyGoalRepository.countByUserId(userId);
        long completedGoals = dailyGoalRepository.countByUserIdAndIsCompleted(userId, true);

        return DashboardStatsResponse.builder()
                .totalJobApplications(totalJobs)
                .totalCodingProblems(totalProblems)
                .totalSolvedProblems(solvedProblems)
                .totalSkills(totalSkills)
                .totalProjects(totalProjects)
                .totalGoals(totalGoals)
                .completedGoals(completedGoals)
                .pendingGoals(totalGoals - completedGoals)
                .jobStatusDistribution(jobApplicationService.getStatusDistribution(userId))
                .problemDifficultyDistribution(codingProblemService.getDifficultyDistribution(userId))
                .build();
    }
}

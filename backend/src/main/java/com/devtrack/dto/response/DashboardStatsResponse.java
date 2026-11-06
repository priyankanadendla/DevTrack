package com.devtrack.dto.response;

import java.util.HashMap;
import java.util.Map;

public class DashboardStatsResponse {
    private long totalJobApplications;
    private long totalCodingProblems;
    private long totalSolvedProblems;
    private long totalSkills;
    private long totalProjects;
    private long totalGoals;
    private long completedGoals;
    private long pendingGoals;
    private Map<String, Long> jobStatusDistribution = new HashMap<>();
    private Map<String, Long> problemDifficultyDistribution = new HashMap<>();

    public DashboardStatsResponse() {}

    public long getTotalJobApplications() { return totalJobApplications; }
    public void setTotalJobApplications(long totalJobApplications) { this.totalJobApplications = totalJobApplications; }

    public long getTotalCodingProblems() { return totalCodingProblems; }
    public void setTotalCodingProblems(long totalCodingProblems) { this.totalCodingProblems = totalCodingProblems; }

    public long getTotalSolvedProblems() { return totalSolvedProblems; }
    public void setTotalSolvedProblems(long totalSolvedProblems) { this.totalSolvedProblems = totalSolvedProblems; }

    public long getTotalSkills() { return totalSkills; }
    public void setTotalSkills(long totalSkills) { this.totalSkills = totalSkills; }

    public long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }

    public long getTotalGoals() { return totalGoals; }
    public void setTotalGoals(long totalGoals) { this.totalGoals = totalGoals; }

    public long getCompletedGoals() { return completedGoals; }
    public void setCompletedGoals(long completedGoals) { this.completedGoals = completedGoals; }

    public long getPendingGoals() { return pendingGoals; }
    public void setPendingGoals(long pendingGoals) { this.pendingGoals = pendingGoals; }

    public Map<String, Long> getJobStatusDistribution() { return jobStatusDistribution; }
    public void setJobStatusDistribution(Map<String, Long> jobStatusDistribution) { this.jobStatusDistribution = jobStatusDistribution; }

    public Map<String, Long> getProblemDifficultyDistribution() { return problemDifficultyDistribution; }
    public void setProblemDifficultyDistribution(Map<String, Long> problemDifficultyDistribution) { this.problemDifficultyDistribution = problemDifficultyDistribution; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final DashboardStatsResponse resp = new DashboardStatsResponse();
        public Builder totalJobApplications(long val) { resp.setTotalJobApplications(val); return this; }
        public Builder totalCodingProblems(long val) { resp.setTotalCodingProblems(val); return this; }
        public Builder totalSolvedProblems(long val) { resp.setTotalSolvedProblems(val); return this; }
        public Builder totalSkills(long val) { resp.setTotalSkills(val); return this; }
        public Builder totalProjects(long val) { resp.setTotalProjects(val); return this; }
        public Builder totalGoals(long val) { resp.setTotalGoals(val); return this; }
        public Builder completedGoals(long val) { resp.setCompletedGoals(val); return this; }
        public Builder pendingGoals(long val) { resp.setPendingGoals(val); return this; }
        public Builder jobStatusDistribution(Map<String, Long> map) { resp.setJobStatusDistribution(map); return this; }
        public Builder problemDifficultyDistribution(Map<String, Long> map) { resp.setProblemDifficultyDistribution(map); return this; }
        public DashboardStatsResponse build() { return resp; }
    }
}

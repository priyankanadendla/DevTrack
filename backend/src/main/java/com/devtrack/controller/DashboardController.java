package com.devtrack.controller;

import com.devtrack.dto.response.DashboardStatsResponse;
import com.devtrack.entity.ActivityLog;
import com.devtrack.security.UserPrincipal;
import com.devtrack.service.ActivityService;
import com.devtrack.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final ActivityService activityService;

    public DashboardController(DashboardService dashboardService, ActivityService activityService) {
        this.dashboardService = dashboardService;
        this.activityService = activityService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(dashboardService.getStats(principal.getId()));
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityLog>> getRecentActivities(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(activityService.getRecent(principal.getId(), limit));
    }

    @GetMapping("/calendar")
    public ResponseEntity<Map<String, Long>> getActivityCalendar(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "365") int days) {
        return ResponseEntity.ok(activityService.getActivityCalendarData(principal.getId(), days));
    }
}

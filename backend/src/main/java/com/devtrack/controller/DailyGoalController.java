package com.devtrack.controller;

import com.devtrack.dto.request.DailyGoalRequest;
import com.devtrack.dto.response.DailyGoalResponse;
import com.devtrack.security.UserPrincipal;
import com.devtrack.service.DailyGoalService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class DailyGoalController {

    private final DailyGoalService dailyGoalService;

    public DailyGoalController(DailyGoalService dailyGoalService) {
        this.dailyGoalService = dailyGoalService;
    }

    @PostMapping
    public ResponseEntity<DailyGoalResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody DailyGoalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dailyGoalService.create(principal.getId(), request));
    }

    @GetMapping
    public ResponseEntity<List<DailyGoalResponse>> getAll(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(dailyGoalService.getAll(principal.getId()));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<DailyGoalResponse>> getByDate(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(dailyGoalService.getByDate(principal.getId(), date));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyGoalResponse> getById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.ok(dailyGoalService.getById(principal.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyGoalResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody DailyGoalRequest request) {
        return ResponseEntity.ok(dailyGoalService.update(principal.getId(), id, request));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<DailyGoalResponse> toggleComplete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.ok(dailyGoalService.toggleComplete(principal.getId(), id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        dailyGoalService.delete(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }
}

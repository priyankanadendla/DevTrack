package com.devtrack.controller;

import com.devtrack.dto.request.SkillRequest;
import com.devtrack.dto.response.SkillResponse;
import com.devtrack.security.UserPrincipal;
import com.devtrack.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody SkillRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.create(principal.getId(), request));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAll(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(skillService.getAll(principal.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillResponse> getById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.ok(skillService.getById(principal.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody SkillRequest request) {
        return ResponseEntity.ok(skillService.update(principal.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        skillService.delete(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }
}

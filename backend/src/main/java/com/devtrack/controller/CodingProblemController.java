package com.devtrack.controller;

import com.devtrack.dto.request.CodingProblemRequest;
import com.devtrack.dto.response.CodingProblemResponse;
import com.devtrack.entity.CodingProblem;
import com.devtrack.security.UserPrincipal;
import com.devtrack.service.CodingProblemService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coding")
public class CodingProblemController {

    private final CodingProblemService codingProblemService;

    public CodingProblemController(CodingProblemService codingProblemService) {
        this.codingProblemService = codingProblemService;
    }

    @PostMapping
    public ResponseEntity<CodingProblemResponse> create(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CodingProblemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(codingProblemService.create(principal.getId(), request));
    }

    @GetMapping
    public ResponseEntity<Page<CodingProblemResponse>> getAll(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) CodingProblem.Difficulty difficulty,
            @RequestParam(required = false) CodingProblem.Status status,
            @RequestParam(required = false) String topic,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(codingProblemService.getAll(principal.getId(), search, difficulty, status, topic, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodingProblemResponse> getById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        return ResponseEntity.ok(codingProblemService.getById(principal.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodingProblemResponse> update(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody CodingProblemRequest request) {
        return ResponseEntity.ok(codingProblemService.update(principal.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        codingProblemService.delete(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }
}

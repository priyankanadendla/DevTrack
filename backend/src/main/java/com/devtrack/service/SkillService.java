package com.devtrack.service;

import com.devtrack.dto.request.SkillRequest;
import com.devtrack.dto.response.SkillResponse;
import com.devtrack.entity.Skill;
import com.devtrack.entity.User;
import com.devtrack.exception.DuplicateResourceException;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.repository.SkillRepository;
import com.devtrack.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public SkillResponse create(Long userId, SkillRequest request) {
        if (skillRepository.existsByUserIdAndSkillName(userId, request.getSkillName())) {
            throw new DuplicateResourceException("Skill '" + request.getSkillName() + "' already exists");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Skill skill = Skill.builder()
                .user(user)
                .skillName(request.getSkillName())
                .category(request.getCategory())
                .proficiencyLevel(request.getProficiencyLevel() != null ? request.getProficiencyLevel() : 0)
                .yearsOfExperience(request.getYearsOfExperience())
                .isPrimary(request.getIsPrimary() != null ? request.getIsPrimary() : false)
                .notes(request.getNotes())
                .build();

        return SkillResponse.from(skillRepository.save(skill));
    }

    @Transactional(readOnly = true)
    public List<SkillResponse> getAll(Long userId) {
        return skillRepository.findByUserId(userId).stream()
                .map(SkillResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SkillResponse getById(Long userId, Long id) {
        return SkillResponse.from(
                skillRepository.findByIdAndUserId(id, userId)
                        .orElseThrow(() -> new ResourceNotFoundException("Skill not found"))
        );
    }

    @Transactional
    public SkillResponse update(Long userId, Long id, SkillRequest request) {
        Skill skill = skillRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        skillRepository.findByUserIdAndSkillName(userId, request.getSkillName())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new DuplicateResourceException("Skill name already exists");
                    }
                });

        skill.setSkillName(request.getSkillName());
        skill.setCategory(request.getCategory());
        if (request.getProficiencyLevel() != null) skill.setProficiencyLevel(request.getProficiencyLevel());
        skill.setYearsOfExperience(request.getYearsOfExperience());
        if (request.getIsPrimary() != null) skill.setIsPrimary(request.getIsPrimary());
        skill.setNotes(request.getNotes());

        return SkillResponse.from(skillRepository.save(skill));
    }

    @Transactional
    public void delete(Long userId, Long id) {
        Skill skill = skillRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));
        skillRepository.delete(skill);
    }
}

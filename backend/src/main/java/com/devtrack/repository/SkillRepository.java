package com.devtrack.repository;

import com.devtrack.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserId(Long userId);
    Optional<Skill> findByIdAndUserId(Long id, Long userId);
    Optional<Skill> findByUserIdAndSkillName(Long userId, String skillName);
    boolean existsByUserIdAndSkillName(Long userId, String skillName);
    long countByUserId(Long userId);
}

package com.devtrack.repository;

import com.devtrack.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findByUserId(Long userId, Pageable pageable);
    Optional<Project> findByIdAndUserId(Long id, Long userId);
    long countByUserId(Long userId);

    @Query("SELECT p FROM Project p WHERE p.user.id = :userId " +
           "AND (:search IS NULL OR LOWER(p.projectName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:status IS NULL OR p.status = :status)")
    Page<Project> findByUserIdWithFilters(
            @Param("userId") Long userId,
            @Param("search") String search,
            @Param("status") Project.Status status,
            Pageable pageable);
}

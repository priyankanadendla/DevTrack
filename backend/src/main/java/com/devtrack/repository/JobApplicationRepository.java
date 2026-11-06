package com.devtrack.repository;

import com.devtrack.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    Page<JobApplication> findByUserId(Long userId, Pageable pageable);

    Optional<JobApplication> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT j FROM JobApplication j WHERE j.user.id = :userId " +
           "AND (:search IS NULL OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(j.jobRole) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:status IS NULL OR j.status = :status)")
    Page<JobApplication> findByUserIdWithFilters(
            @Param("userId") Long userId,
            @Param("search") String search,
            @Param("status") JobApplication.Status status,
            Pageable pageable);

    long countByUserId(Long userId);

    @Query("SELECT j.status, COUNT(j) FROM JobApplication j WHERE j.user.id = :userId GROUP BY j.status")
    List<Object[]> countByUserIdGroupByStatus(@Param("userId") Long userId);
}

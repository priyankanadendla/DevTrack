package com.devtrack.repository;

import com.devtrack.entity.CodingProblem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProblemRepository extends JpaRepository<CodingProblem, Long> {

    Page<CodingProblem> findByUserId(Long userId, Pageable pageable);

    Optional<CodingProblem> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT c FROM CodingProblem c WHERE c.user.id = :userId " +
           "AND (:search IS NULL OR LOWER(c.problemName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:difficulty IS NULL OR c.difficulty = :difficulty) " +
           "AND (:status IS NULL OR c.status = :status) " +
           "AND (:topic IS NULL OR LOWER(c.topic) LIKE LOWER(CONCAT('%', :topic, '%')))")
    Page<CodingProblem> findByUserIdWithFilters(
            @Param("userId") Long userId,
            @Param("search") String search,
            @Param("difficulty") CodingProblem.Difficulty difficulty,
            @Param("status") CodingProblem.Status status,
            @Param("topic") String topic,
            Pageable pageable);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, CodingProblem.Status status);

    long countByUserIdAndDifficulty(Long userId, CodingProblem.Difficulty difficulty);

    @Query("SELECT c.difficulty, COUNT(c) FROM CodingProblem c WHERE c.user.id = :userId GROUP BY c.difficulty")
    List<Object[]> countByUserIdGroupByDifficulty(@Param("userId") Long userId);

    @Query("SELECT COUNT(c) FROM CodingProblem c WHERE c.user.id = :userId AND c.solvedDate = :date AND c.status = 'SOLVED'")
    long countSolvedByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query("SELECT c.solvedDate, COUNT(c) FROM CodingProblem c WHERE c.user.id = :userId " +
           "AND c.status = 'SOLVED' AND c.solvedDate >= :startDate GROUP BY c.solvedDate ORDER BY c.solvedDate")
    List<Object[]> countSolvedByUserIdGroupByDate(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
}

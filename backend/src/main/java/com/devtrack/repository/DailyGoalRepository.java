package com.devtrack.repository;

import com.devtrack.entity.DailyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {
    List<DailyGoal> findByUserIdAndGoalDateOrderByPriorityDesc(Long userId, LocalDate date);
    List<DailyGoal> findByUserIdOrderByGoalDateDescCreatedAtDesc(Long userId);
    Optional<DailyGoal> findByIdAndUserId(Long id, Long userId);

    long countByUserId(Long userId);
    long countByUserIdAndIsCompleted(Long userId, Boolean isCompleted);

    @Query("SELECT g.goalDate, COUNT(g), SUM(CASE WHEN g.isCompleted = true THEN 1 ELSE 0 END) " +
           "FROM DailyGoal g WHERE g.user.id = :userId AND g.goalDate >= :startDate " +
           "GROUP BY g.goalDate ORDER BY g.goalDate")
    List<Object[]> getGoalStatsByUserIdFromDate(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
}

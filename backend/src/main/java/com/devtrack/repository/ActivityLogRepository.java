package com.devtrack.repository;

import com.devtrack.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT a.activityDate, COUNT(a) FROM ActivityLog a WHERE a.user.id = :userId " +
           "AND a.activityDate >= :startDate GROUP BY a.activityDate ORDER BY a.activityDate")
    List<Object[]> getActivityCountByDate(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);

    @Query("SELECT a FROM ActivityLog a WHERE a.user.id = :userId ORDER BY a.createdAt DESC")
    List<ActivityLog> findRecentByUserId(@Param("userId") Long userId, org.springframework.data.domain.Pageable pageable);

    long countByUserIdAndActivityDate(Long userId, LocalDate date);
}

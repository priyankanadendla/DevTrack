package com.devtrack.service;

import com.devtrack.entity.ActivityLog;
import com.devtrack.repository.ActivityLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @Transactional(readOnly = true)
    public List<ActivityLog> getRecent(Long userId, int limit) {
        return activityLogRepository.findRecentByUserId(userId, PageRequest.of(0, limit));
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getActivityCalendarData(Long userId, int daysBack) {
        LocalDate startDate = LocalDate.now().minusDays(daysBack);
        List<Object[]> results = activityLogRepository.getActivityCountByDate(userId, startDate);

        Map<String, Long> calendar = new LinkedHashMap<>();
        for (Object[] row : results) {
            calendar.put(row[0].toString(), (Long) row[1]);
        }
        return calendar;
    }
}

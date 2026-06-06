package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link ActivityLog} entity.
 */
@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}

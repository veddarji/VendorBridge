package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link Approval} entity.
 */
@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long> {
}

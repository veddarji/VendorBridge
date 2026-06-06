package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.RfqVendorAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link RfqVendorAssignment} entity.
 */
@Repository
public interface RfqVendorAssignmentRepository 
        extends JpaRepository<RfqVendorAssignment, RfqVendorAssignment.RfqVendorAssignmentId> {
}

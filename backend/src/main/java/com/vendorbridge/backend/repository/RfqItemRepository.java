package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.RfqItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link RfqItem} entity.
 */
@Repository
public interface RfqItemRepository extends JpaRepository<RfqItem, Long> {
    java.util.List<RfqItem> findByRfqId(Long rfqId);
}

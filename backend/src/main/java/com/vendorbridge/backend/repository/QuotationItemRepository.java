package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.QuotationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link QuotationItem} entity.
 */
@Repository
public interface QuotationItemRepository extends JpaRepository<QuotationItem, Long> {
}

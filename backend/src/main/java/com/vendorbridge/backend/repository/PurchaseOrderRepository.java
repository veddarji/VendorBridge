package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link PurchaseOrder} entity.
 */
@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

    /**
     * Find purchase order by its PO document number.
     *
     * @param poNumber PO code
     * @return optional containing purchase order if found
     */
    Optional<PurchaseOrder> findByPoNumber(String poNumber);
}

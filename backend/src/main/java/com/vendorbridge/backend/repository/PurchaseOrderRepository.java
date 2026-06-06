package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * PurchaseOrder Repository.
 */
@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    /**
     * Find by PO number.
     * @param poNumber the po number
     * @return the optional PO
     */
    Optional<PurchaseOrder> findByPoNumber(String poNumber);
}

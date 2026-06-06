package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link Invoice} entity.
 */
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    /**
     * Find invoice by invoice number.
     *
     * @param invoiceNumber invoice number
     * @return optional containing invoice if found
     */
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
}

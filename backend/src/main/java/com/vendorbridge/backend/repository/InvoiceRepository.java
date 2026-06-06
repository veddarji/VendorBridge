package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Invoice Repository.
 */
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    /**
     * Find by invoice number.
     * @param invoiceNumber the invoice number
     * @return the optional Invoice
     */
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
}

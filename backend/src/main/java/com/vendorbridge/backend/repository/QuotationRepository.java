package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link Quotation} entity.
 */
@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {

    /**
     * Find quotation by document number.
     *
     * @param quotationNumber quotation number
     * @return optional containing quotation if found
     */
    Optional<Quotation> findByQuotationNumber(String quotationNumber);
}

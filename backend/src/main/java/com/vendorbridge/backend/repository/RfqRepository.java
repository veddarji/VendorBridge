package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Rfq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link Rfq} entity.
 */
@Repository
public interface RfqRepository extends JpaRepository<Rfq, Long> {

    /**
     * Find RFQ by business document number.
     *
     * @param rfqNumber RFQ number string
     * @return optional containing RFQ if found
     */
    Optional<Rfq> findByRfqNumber(String rfqNumber);
}

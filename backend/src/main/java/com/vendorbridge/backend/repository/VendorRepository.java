package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link Vendor} entity.
 */
@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    /**
     * Find vendor profile by GST number.
     *
     * @param gstNumber GST tax identifier
     * @return optional containing vendor if found
     */
    Optional<Vendor> findByGstNumber(String gstNumber);
}

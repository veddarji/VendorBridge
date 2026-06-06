package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link Product} entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Find product by SKU code.
     *
     * @param sku product unique SKU identifier
     * @return optional containing product if found
     */
    Optional<Product> findBySku(String sku);
}

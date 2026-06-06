package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Repository for the {@link Role} entity.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}

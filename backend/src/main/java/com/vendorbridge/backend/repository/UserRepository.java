package com.vendorbridge.backend.repository;

import com.vendorbridge.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data Repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email.
     *
     * @param email user email
     * @return optional containing user if found
     */
    Optional<User> findByEmail(String email);
}

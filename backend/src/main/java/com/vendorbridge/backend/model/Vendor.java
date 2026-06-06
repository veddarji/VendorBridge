package com.vendorbridge.backend.model;

import com.vendorbridge.backend.model.enums.VendorStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entity class.
 */
@Entity
@Table(name = "vendors")
@Getter
@Setter
@NoArgsConstructor
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "gst_number", nullable = false, unique = true, length = 15)
    private String gstNumber;

    @Column(name = "contact_email", nullable = false, length = 100)
    private String contactEmail;

    @Column(name = "contact_phone", nullable = false, length = 20)
    private String contactPhone;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private VendorStatus status = VendorStatus.PENDING;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating = BigDecimal.ZERO;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

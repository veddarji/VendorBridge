package com.vendorbridge.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Entity class.
 */
@Entity
@Table(name = "rfq_vendor_assignments")
@IdClass(RfqVendorAssignment.RfqVendorAssignmentId.class)
@Getter
@Setter
@NoArgsConstructor
public class RfqVendorAssignment {

    @Id
    @ManyToOne
    @JoinColumn(name = "rfq_id", nullable = false)
    private Rfq rfq;

    @Id
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @CreationTimestamp
    @Column(name = "assigned_at", updatable = false)
    private LocalDateTime assignedAt;

    /**
     * Inner class.
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class RfqVendorAssignmentId implements Serializable {
        private Long rfq;
        private Long vendor;
        
        // Let lombok generate getters/setters/equals/hashCode eventually
    }
}

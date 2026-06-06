package com.vendorbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Javadoc. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
/**
 * Class documentation.
 */
public class QuotationDto {
    private String rfqId;
    private String rfqTitle;
    private String vendorName;
    private Double price;
    private Integer leadTime;
    private String notes;
}

package com.vendorbridge.backend.dto;

import lombok.Data;

/** Javadoc. */
@Data
public class CreatePoRequest {
    private String rfqId;
    private String vendorName;
    private Double bidAmount;
    private String remarks;
}

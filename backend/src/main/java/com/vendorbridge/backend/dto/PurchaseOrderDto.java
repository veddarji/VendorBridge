package com.vendorbridge.backend.dto;

import lombok.Builder;
import lombok.Data;

/**
 * PurchaseOrder Dto.
 */
@Data
@Builder
public class PurchaseOrderDto {
    private String poNumber;
    private String rfqId;
    private String vendorName;
    private Double amount;
    private String status;
    private String date;
}

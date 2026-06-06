package com.vendorbridge.backend.dto;

import lombok.Builder;
import lombok.Data;

/**
 * Invoice Dto.
 */
@Data
@Builder
public class InvoiceDto {
    private String invoiceNumber;
    private String poNumber;
    private Double amount;
    private String status;
    private String date;
}

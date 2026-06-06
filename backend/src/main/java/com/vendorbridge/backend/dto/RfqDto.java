package com.vendorbridge.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
/**
 * Class documentation.
 */
public class RfqDto {
    private String id;
    private String title;
    private String description;
    private Integer qty;
    private String deadline;
    private String assignedVendor;
    private String status;
    private Integer quotesCount;
    private String selectedVendor;
    private Double selectedBid;
    private Integer selectedLeadTime;
    
    private List<RfqItemDto> items;
}

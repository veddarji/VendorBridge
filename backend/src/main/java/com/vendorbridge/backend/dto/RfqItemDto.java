package com.vendorbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
/**
 * Class documentation.
 */
public class RfqItemDto {
    private String name;
    private Integer qty;
    private Double price;
}

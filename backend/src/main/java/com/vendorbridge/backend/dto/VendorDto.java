package com.vendorbridge.backend.dto;

import lombok.Builder;
import lombok.Data;

/** Javadoc. */
@Data
@Builder
/**
 * Class documentation.
 */
public class VendorDto {
    private Long id;
    private String name;
    private String category;
    private String gst;
    private String contact;
    private String email;
    private String rating;
    private String status;
}

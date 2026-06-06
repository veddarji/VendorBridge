package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.VendorDto;
import com.vendorbridge.backend.model.Vendor;
import com.vendorbridge.backend.repository.VendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
/**
 * Class documentation.
 */
public class VendorService {

    private final VendorRepository vendorRepository;

    public VendorService(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    /**
     * Method documentation.
     */
    public List<VendorDto> getAllVendors() {
        return vendorRepository.findAll(
        ).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private VendorDto mapToDto(Vendor vendor) {
        return VendorDto.builder()
                .id(vendor.getId())
                .name(vendor.getCompanyName())
                .category(vendor.getCategory())
                .gst(vendor.getGstNumber())
                .contact(vendor.getContactPhone())
                .email(vendor.getContactEmail())
                .rating(vendor.getRating() + "/5.0")
                .status(vendor.getStatus().name())
                .build();
    }
}

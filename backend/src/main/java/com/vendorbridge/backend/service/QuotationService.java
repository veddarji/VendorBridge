package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.QuotationDto;
import com.vendorbridge.backend.model.Quotation;
import com.vendorbridge.backend.model.Rfq;
import com.vendorbridge.backend.model.User;
import com.vendorbridge.backend.model.Vendor;
import com.vendorbridge.backend.model.enums.QuotationStatus;
import com.vendorbridge.backend.repository.QuotationRepository;
import com.vendorbridge.backend.repository.RfqRepository;
import com.vendorbridge.backend.repository.UserRepository;
import com.vendorbridge.backend.repository.VendorRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
/**
 * Class documentation.
 */
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final RfqRepository rfqRepository;
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public QuotationService(QuotationRepository quotationRepository, RfqRepository rfqRepository, 
                            VendorRepository vendorRepository, UserRepository userRepository) {
        this.quotationRepository = quotationRepository;
        this.rfqRepository = rfqRepository;
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    /**
     * Method documentation.
     */
    public List<QuotationDto> getAllQuotations() {
        return quotationRepository.findAll(
        ).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public QuotationDto createQuotation(QuotationDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Rfq rfq = rfqRepository.findByRfqNumber(dto.getRfqId())
                .orElseThrow(() -> new RuntimeException("RFQ not found: " + dto.getRfqId()));

        Vendor vendor = vendorRepository.findByCompanyName(dto.getVendorName())
                .orElseGet(() -> {
                    // Create dummy vendor for hackathon if not found
                    Vendor newVendor = new Vendor();
                    newVendor.setCompanyName(dto.getVendorName());
                    newVendor.setCategory("General");
                    newVendor.setGstNumber("GST-" + System.currentTimeMillis());
                    newVendor.setContactEmail(currentUser.getEmail());
                    newVendor.setContactPhone(
        currentUser.getPhoneNumber() != null ? currentUser.getPhoneNumber() : "000");
                    newVendor.setAddress("Unknown");
                    newVendor.setUser(currentUser);
                    return vendorRepository.save(newVendor);
                });

        Quotation quotation = new Quotation();
        quotation.setQuotationNumber("QT-" + System.currentTimeMillis());
        quotation.setRfq(rfq);
        quotation.setVendor(vendor);
        quotation.setStatus(QuotationStatus.SUBMITTED);
        quotation.setDeliveryTimelineDays(dto.getLeadTime());
        
        BigDecimal price = BigDecimal.valueOf(dto.getPrice());
        BigDecimal tax = price.multiply(BigDecimal.valueOf(0.18)); // 18% tax
        
        quotation.setTotalAmount(price);
        quotation.setTaxAmount(tax);
        quotation.setGrandTotal(price.add(tax));
        quotation.setNotes(dto.getNotes());
        quotation.setCreatedBy(currentUser);

        Quotation saved = quotationRepository.save(quotation);
        return mapToDto(saved);
    }

    private QuotationDto mapToDto(Quotation quotation) {
        return QuotationDto.builder()
                .rfqId(quotation.getRfq().getRfqNumber())
                .rfqTitle(quotation.getRfq().getTitle())
                .vendorName(quotation.getVendor().getCompanyName())
                .price(quotation.getTotalAmount().doubleValue())
                .leadTime(quotation.getDeliveryTimelineDays())
                .notes(quotation.getNotes())
                .build();
    }
}

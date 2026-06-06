package com.vendorbridge.backend.controller;

import com.vendorbridge.backend.dto.QuotationDto;
import com.vendorbridge.backend.service.QuotationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Javadoc. */
@RestController
@RequestMapping("/api/quotes")
/**
 * Class documentation.
 */
public class QuotationController {

    private final QuotationService quotationService;

    public QuotationController(QuotationService quotationService) {
        this.quotationService = quotationService;
    }

    @GetMapping
    public ResponseEntity<List<QuotationDto>> getAllQuotations() {
        return ResponseEntity.ok(quotationService.getAllQuotations());
    }

    @PostMapping
    public ResponseEntity<QuotationDto> createQuotation(@RequestBody QuotationDto dto) {
        return ResponseEntity.ok(quotationService.createQuotation(dto));
    }
}

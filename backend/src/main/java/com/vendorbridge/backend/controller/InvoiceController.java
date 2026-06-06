package com.vendorbridge.backend.controller;

import com.vendorbridge.backend.dto.InvoiceDto;
import com.vendorbridge.backend.model.Invoice;
import com.vendorbridge.backend.repository.InvoiceRepository;
import com.vendorbridge.backend.service.EmailNotificationService;
import com.vendorbridge.backend.service.InvoiceService;
import com.vendorbridge.backend.service.PdfGenerationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Javadoc. */
@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final PdfGenerationService pdfGenerationService;
    private final EmailNotificationService emailNotificationService;
    private final InvoiceRepository invoiceRepository;

    /** Javadoc. */
    public InvoiceController(InvoiceService invoiceService, 
                             PdfGenerationService pdfGenerationService, 
                             EmailNotificationService emailNotificationService,
                             InvoiceRepository invoiceRepository) {
        this.invoiceService = invoiceService;
        this.pdfGenerationService = pdfGenerationService;
        this.emailNotificationService = emailNotificationService;
        this.invoiceRepository = invoiceRepository;
    }

    /** Javadoc. */
    @GetMapping
    public ResponseEntity<List<InvoiceDto>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    /** Javadoc. */
    @PostMapping("/from-po/{poNumber}")
    public ResponseEntity<InvoiceDto> createInvoice(@PathVariable String poNumber) {
        return ResponseEntity.ok(invoiceService.createInvoiceFromPo(poNumber));
    }

    /** Javadoc. */
    @GetMapping("/{invoiceNumber}/pdf")
    public ResponseEntity<byte[]> getInvoicePdf(@PathVariable String invoiceNumber) {
        byte[] pdf = pdfGenerationService.generateInvoicePdf(invoiceNumber);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, 
                    "attachment; filename=\"" + invoiceNumber + ".pdf\"")
            .contentType(MediaType.APPLICATION_PDF)
            .body(pdf);
    }

    /** Javadoc. */
    @PostMapping("/{invoiceNumber}/email")
    public ResponseEntity<String> emailInvoice(@PathVariable String invoiceNumber) {
        byte[] pdf = pdfGenerationService.generateInvoicePdf(invoiceNumber);
        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber).orElseThrow();
        emailNotificationService.sendInvoiceEmail(
                invoice.getPurchaseOrder().getVendor().getContactEmail(), invoiceNumber, pdf);
        return ResponseEntity.ok("Email queued successfully");
    }
}

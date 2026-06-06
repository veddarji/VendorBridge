package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.InvoiceDto;
import com.vendorbridge.backend.model.Invoice;
import com.vendorbridge.backend.model.PurchaseOrder;
import com.vendorbridge.backend.model.User;
import com.vendorbridge.backend.model.enums.InvoiceStatus;
import com.vendorbridge.backend.model.enums.PurchaseOrderStatus;
import com.vendorbridge.backend.repository.InvoiceRepository;
import com.vendorbridge.backend.repository.PurchaseOrderRepository;
import com.vendorbridge.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for Invoices.
 */
@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final UserRepository userRepository;

    /** Javadoc. */
    public InvoiceService(InvoiceRepository invoiceRepository, 
                          PurchaseOrderRepository purchaseOrderRepository, 
                          UserRepository userRepository) {
        this.invoiceRepository = invoiceRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.userRepository = userRepository;
    }

    /** Javadoc. */
    public List<InvoiceDto> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(this::mapToDto).collect(Collectors.toList());
    }

    /** Javadoc. */
    @Transactional
    public InvoiceDto createInvoiceFromPo(String poNumber) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email).orElseThrow();

        PurchaseOrder po = purchaseOrderRepository.findByPoNumber(poNumber).orElseThrow();
        po.setStatus(PurchaseOrderStatus.FULFILLED);
        purchaseOrderRepository.save(po);

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        invoice.setPurchaseOrder(po);
        invoice.setAmount(po.getTotalAmount());
        invoice.setStatus(InvoiceStatus.PENDING);
        invoice.setCreatedBy(currentUser);

        Invoice savedInvoice = invoiceRepository.save(invoice);

        return mapToDto(savedInvoice);
    }

    private InvoiceDto mapToDto(Invoice invoice) {
        return InvoiceDto.builder()
                .invoiceNumber(invoice.getInvoiceNumber())
                .poNumber(invoice.getPurchaseOrder().getPoNumber())
                .amount(invoice.getAmount().doubleValue())
                .status(invoice.getStatus().name())
                .date(invoice.getCreatedAt().toString())
                .build();
    }
}

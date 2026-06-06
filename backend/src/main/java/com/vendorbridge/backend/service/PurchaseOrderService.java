package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.PurchaseOrderDto;
import com.vendorbridge.backend.model.PurchaseOrder;
import com.vendorbridge.backend.model.Rfq;
import com.vendorbridge.backend.model.User;
import com.vendorbridge.backend.model.Vendor;
import com.vendorbridge.backend.model.enums.PurchaseOrderStatus;
import com.vendorbridge.backend.model.enums.RfqStatus;
import com.vendorbridge.backend.repository.PurchaseOrderRepository;
import com.vendorbridge.backend.repository.RfqRepository;
import com.vendorbridge.backend.repository.UserRepository;
import com.vendorbridge.backend.repository.VendorRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for Purchase Orders.
 */
@Service
public class PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final RfqRepository rfqRepository;
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    /**
     * Constructor Javadoc.
     */
    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository,
                                RfqRepository rfqRepository,
                                VendorRepository vendorRepository,
                                UserRepository userRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.rfqRepository = rfqRepository;
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    /**
     * Method documentation.
     */
    public List<PurchaseOrderDto> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll().stream()
                .map(this::mapToDto).collect(Collectors.toList());
    }

    /**
     * Method documentation.
     */
    @Transactional
    public PurchaseOrderDto createFromRfq(String rfqNumber, String vendorName, Double bidAmount) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email).orElseThrow();

        Rfq rfq = rfqRepository.findByRfqNumber(rfqNumber).orElseThrow();
        rfq.setStatus(RfqStatus.COMPLETED);
        rfqRepository.save(rfq);

        Vendor vendor = vendorRepository.findByCompanyName(vendorName).orElseThrow();

        PurchaseOrder po = new PurchaseOrder();
        po.setPoNumber("PO-" + System.currentTimeMillis());
        po.setRfq(rfq);
        po.setVendor(vendor);
        po.setTotalAmount(BigDecimal.valueOf(bidAmount));
        po.setStatus(PurchaseOrderStatus.ISSUED);
        po.setCreatedBy(currentUser);

        PurchaseOrder savedPo = purchaseOrderRepository.save(po);

        return mapToDto(savedPo);
    }

    private PurchaseOrderDto mapToDto(PurchaseOrder po) {
        return PurchaseOrderDto.builder()
                .poNumber(po.getPoNumber())
                .rfqId(po.getRfq().getRfqNumber())
                .vendorName(po.getVendor().getCompanyName())
                .amount(po.getTotalAmount().doubleValue())
                .status(po.getStatus().name())
                .date(po.getCreatedAt().toString())
                .build();
    }
}

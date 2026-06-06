package com.vendorbridge.backend.controller;

import com.vendorbridge.backend.dto.CreatePoRequest;
import com.vendorbridge.backend.dto.PurchaseOrderDto;
import com.vendorbridge.backend.service.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Javadoc. */
@RestController
@RequestMapping("/api/pos")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    /** Javadoc. */
    public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
        this.purchaseOrderService = purchaseOrderService;
    }

    /** Javadoc. */
    @GetMapping
    public ResponseEntity<List<PurchaseOrderDto>> getAllPurchaseOrders() {
        return ResponseEntity.ok(purchaseOrderService.getAllPurchaseOrders());
    }

    /** Javadoc. */
    @PostMapping("/from-rfq")
    public ResponseEntity<PurchaseOrderDto> createPoFromRfq(@RequestBody CreatePoRequest request) {
        return ResponseEntity.ok(purchaseOrderService.createFromRfq(
                request.getRfqId(), request.getVendorName(), request.getBidAmount()));
    }
}

package com.vendorbridge.backend.controller;

import com.vendorbridge.backend.dto.RfqDto;
import com.vendorbridge.backend.service.RfqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rfqs")
/**
 * Class documentation.
 */
public class RfqController {

    private final RfqService rfqService;

    public RfqController(RfqService rfqService) {
        this.rfqService = rfqService;
    }

    @GetMapping
    public ResponseEntity<List<RfqDto>> getAllRfqs() {
        return ResponseEntity.ok(rfqService.getAllRfqs());
    }

    @PostMapping
    public ResponseEntity<RfqDto> createRfq(@RequestBody RfqDto rfqDto) {
        return ResponseEntity.ok(rfqService.createRfq(rfqDto));
    }
}

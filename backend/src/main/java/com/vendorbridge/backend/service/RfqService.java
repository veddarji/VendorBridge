package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.RfqDto;
import com.vendorbridge.backend.dto.RfqItemDto;
import com.vendorbridge.backend.model.Rfq;
import com.vendorbridge.backend.model.RfqItem;
import com.vendorbridge.backend.model.User;
import com.vendorbridge.backend.model.enums.RfqStatus;
import com.vendorbridge.backend.repository.RfqItemRepository;
import com.vendorbridge.backend.repository.RfqRepository;
import com.vendorbridge.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Class documentation.
 */
@Service
public class RfqService {

    private final RfqRepository rfqRepository;
    private final RfqItemRepository rfqItemRepository;
    private final UserRepository userRepository;

    /**
     * Constructor Javadoc.
     */
    public RfqService(RfqRepository rfqRepository, 
                      RfqItemRepository rfqItemRepository, 
                      UserRepository userRepository) {
        this.rfqRepository = rfqRepository;
        this.rfqItemRepository = rfqItemRepository;
        this.userRepository = userRepository;
    }

    /**
     * Method documentation.
     */
    public List<RfqDto> getAllRfqs() {
        return rfqRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    /**
     * Method documentation.
     */
    @Transactional
    public RfqDto createRfq(RfqDto rfqDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Rfq rfq = new Rfq();
        rfq.setRfqNumber("RFQ-" + System.currentTimeMillis());
        rfq.setTitle(rfqDto.getTitle());
        rfq.setDescription(rfqDto.getDescription());
        
        // Parse deadline
        if (rfqDto.getDeadline() != null) {
            rfq.setDeadline(LocalDate.parse(rfqDto.getDeadline(), 
                    DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay());
        } else {
            rfq.setDeadline(LocalDateTime.now().plusDays(14));
        }
        
        rfq.setStatus(RfqStatus.ACTIVE);
        rfq.setCreatedBy(currentUser);
        
        Rfq savedRfq = rfqRepository.save(rfq);

        if (rfqDto.getItems() != null) {
            for (RfqItemDto itemDto : rfqDto.getItems()) {
                RfqItem item = new RfqItem();
                item.setRfq(savedRfq);
                item.setProductNameCustom(itemDto.getName());
                item.setQuantity(BigDecimal.valueOf(itemDto.getQty()));
                item.setTargetPrice(BigDecimal.valueOf(itemDto.getPrice()));
                rfqItemRepository.save(item);
            }
        }

        return mapToDto(savedRfq);
    }

    private RfqDto mapToDto(Rfq rfq) {
        List<RfqItem> items = rfqItemRepository.findByRfqId(rfq.getId());
        int totalQty = items.stream().mapToInt(i -> i.getQuantity().intValue()).sum();
        
        return RfqDto.builder()
                .id(rfq.getRfqNumber())
                .title(rfq.getTitle())
                .description(rfq.getDescription())
                .qty(totalQty)
                .deadline(rfq.getDeadline().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .assignedVendor("all") // For now, broadcast to all
                .status(rfq.getStatus() == RfqStatus.ACTIVE ? "Active" : rfq.getStatus().name())
                .quotesCount(0) // Simplification for now
                .build();
    }
}

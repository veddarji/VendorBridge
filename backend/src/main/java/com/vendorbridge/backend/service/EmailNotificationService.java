package com.vendorbridge.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/** Javadoc. */
@Service
public class EmailNotificationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailNotificationService.class);

    /** Javadoc. */
    public void sendInvoiceEmail(String vendorEmail, String invoiceNumber, byte[] pdfAttachment) {
        LOGGER.info("=================================================");
        LOGGER.info("MOCK EMAIL DISPATCHED");
        LOGGER.info("To: {}", vendorEmail);
        LOGGER.info("Subject: Invoice {} from VendorBridge", invoiceNumber);
        LOGGER.info("Body: Please find your invoice attached. Thank you for your services.");
        LOGGER.info("Attachment: {}.pdf ({} bytes)", invoiceNumber, pdfAttachment.length);
        LOGGER.info("=================================================");
    }
}

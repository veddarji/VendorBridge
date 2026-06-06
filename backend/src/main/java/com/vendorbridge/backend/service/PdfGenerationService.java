package com.vendorbridge.backend.service;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.vendorbridge.backend.model.Invoice;
import com.vendorbridge.backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

/** Javadoc. */
@Service
public class PdfGenerationService {

    private final InvoiceRepository invoiceRepository;

    /** Javadoc. */
    public PdfGenerationService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    /** Javadoc. */
    public byte[] generateInvoicePdf(String invoiceNumber) {
        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber).orElseThrow();
        
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font fontTitle = new Font(Font.HELVETICA, 20, Font.BOLD);
            Paragraph title = new Paragraph("INVOICE", fontTitle);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Invoice Number: " + invoice.getInvoiceNumber()));
            document.add(new Paragraph("Date: " + invoice.getCreatedAt().toString()));
            document.add(new Paragraph("PO Number: " + invoice.getPurchaseOrder().getPoNumber()));
            document.add(new Paragraph("Vendor: " 
                    + invoice.getPurchaseOrder().getVendor().getCompanyName()));
            document.add(new Paragraph(" "));
            
            Font fontAmount = new Font(Font.HELVETICA, 16, Font.BOLD);
            document.add(new Paragraph("Total Amount: Rs." + invoice.getAmount(), fontAmount));
            document.add(new Paragraph("Status: " + invoice.getStatus().name()));
            
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Thank you for your business."));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}

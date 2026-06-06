-- ============================================================================
-- Procurement & Vendor Management ERP - Flyway V1__Initial_Schema (MariaDB / MySQL)
-- ============================================================================

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    phone_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
    CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    company_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    gst_number VARCHAR(15) NOT NULL UNIQUE,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_vendors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT chk_vendors_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'BLACKLISTED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    unit_of_measure VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. RFQs (Request For Quotations) Table
CREATE TABLE IF NOT EXISTS rfqs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rfq_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    deadline TIMESTAMP NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT',
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_rfqs_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_rfqs_status CHECK (status IN ('DRAFT', 'ACTIVE', 'CLOSED', 'UNDER_REVIEW', 'COMPLETED', 'CANCELLED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. RFQ Items Table
CREATE TABLE IF NOT EXISTS rfq_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    rfq_id BIGINT NOT NULL,
    product_id BIGINT,
    product_name_custom VARCHAR(150),
    quantity DECIMAL(12,4) NOT NULL,
    target_price DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rfq_items_rfq FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    CONSTRAINT fk_rfq_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. RFQ Vendor Assignments Table (M:N)
CREATE TABLE IF NOT EXISTS rfq_vendor_assignments (
    rfq_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rfq_id, vendor_id),
    CONSTRAINT fk_assignments_rfq FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Quotations Table
CREATE TABLE IF NOT EXISTS quotations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    rfq_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    status VARCHAR(30) DEFAULT 'SUBMITTED',
    delivery_timeline_days INT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    notes TEXT,
    created_by BIGINT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quotations_rfq FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    CONSTRAINT fk_quotations_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    CONSTRAINT fk_quotations_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_quotations_status CHECK (status IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quotation Items Table
CREATE TABLE IF NOT EXISTS quotation_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quotation_id BIGINT NOT NULL,
    rfq_item_id BIGINT NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 18.00,
    tax_amount DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    delivery_date DATE,
    notes TEXT,
    CONSTRAINT fk_qitems_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
    CONSTRAINT fk_qitems_rfq_item FOREIGN KEY (rfq_item_id) REFERENCES rfq_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Approvals Table
CREATE TABLE IF NOT EXISTS approvals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quotation_id BIGINT NOT NULL,
    approver_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    remarks TEXT,
    step_number INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actioned_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT fk_approvals_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
    CONSTRAINT fk_approvals_approver FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_approvals_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Purchase Orders Table
CREATE TABLE IF NOT EXISTS purchase_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    po_number VARCHAR(50) NOT NULL UNIQUE,
    quotation_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT',
    total_amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    shipping_address TEXT NOT NULL,
    billing_address TEXT NOT NULL,
    delivery_deadline DATE,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pos_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pos_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pos_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_pos_status CHECK (status IN ('DRAFT', 'SENT_TO_VENDOR', 'ACCEPTED', 'REJECTED', 'DELIVERED', 'CANCELLED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    purchase_order_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING',
    total_amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    pdf_url VARCHAR(255),
    sent_email_status VARCHAR(20) DEFAULT 'NOT_SENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_invoices_po FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE RESTRICT,
    CONSTRAINT fk_invoices_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE RESTRICT,
    CONSTRAINT chk_invoices_status CHECK (status IN ('PENDING', 'PAID', 'OVERDUE', 'VOID', 'CANCELLED')),
    CONSTRAINT chk_invoices_email CHECK (sent_email_status IN ('NOT_SENT', 'SENT', 'FAILED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Activity Logs Table (Audit Trail)
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- Indexes for Search Performance and Query Optimization
-- ============================================================================

-- Users Indexes
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_status ON users(status);

-- Vendors Indexes
CREATE INDEX idx_vendors_company_name ON vendors(company_name);
CREATE INDEX idx_vendors_status ON vendors(status);

-- Products Indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category ON products(category);

-- RFQ Indexes
CREATE INDEX idx_rfqs_status ON rfqs(status);
CREATE INDEX idx_rfqs_deadline ON rfqs(deadline);

-- RFQ Items Indexes
CREATE INDEX idx_rfq_items_rfq_id ON rfq_items(rfq_id);

-- RFQ Vendor Assignment Indexes
CREATE INDEX idx_assignments_vendor_id ON rfq_vendor_assignments(vendor_id);

-- Quotation Indexes
CREATE INDEX idx_quotations_rfq_id ON quotations(rfq_id);
CREATE INDEX idx_quotations_vendor_id ON quotations(vendor_id);
CREATE INDEX idx_quotations_status ON quotations(status);

-- Quotation Items Indexes
CREATE INDEX idx_qitems_quotation_id ON quotation_items(quotation_id);

-- Approval Indexes
CREATE INDEX idx_approvals_quotation_id ON approvals(quotation_id);
CREATE INDEX idx_approvals_approver_id ON approvals(approver_id);
CREATE INDEX idx_approvals_status ON approvals(status);

-- PO Indexes
CREATE INDEX idx_pos_vendor_id ON purchase_orders(vendor_id);
CREATE INDEX idx_pos_status ON purchase_orders(status);

-- Invoice Indexes
CREATE INDEX idx_invoices_po_id ON invoices(purchase_order_id);
CREATE INDEX idx_invoices_vendor_id ON invoices(vendor_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

-- Activity Logs Indexes
CREATE INDEX idx_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_logs_created_at ON activity_logs(created_at);

-- Notifications Indexes
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ============================================================================
-- Initial Role Seed Data
-- ============================================================================
INSERT IGNORE INTO roles (id, name, description)
VALUES 
    (1, 'ADMIN', 'Super administrator with full system controls'),
    (2, 'PROCUREMENT_OFFICER', 'Staff responsible for creating RFQs, comparing quotes, and issuing POs'),
    (3, 'VENDOR', 'External suppliers bidding on RFQs and issuing invoices'),
    (4, 'APPROVER', 'Managers with authority to approve/reject quotations and PO requests');

-- ============================================================================
-- Test Users Seed Data (Passwords are pre-hashed BCrypt for 'password123')
-- ============================================================================
INSERT IGNORE INTO users (id, email, password_hash, full_name, role_id, phone_number, status)
VALUES
    (1, 'admin@vendorbridge.com', '$2a$12$R9h/lIPzMRFh41Tq5K0eQ.P8w2tLpQxW3qZJ4hL9j9zV2a8kU3m0O', 'Admin User', 1, '+15550100', 'ACTIVE'),
    (2, 'officer@vendorbridge.com', '$2a$12$R9h/lIPzMRFh41Tq5K0eQ.P8w2tLpQxW3qZJ4hL9j9zV2a8kU3m0O', 'Sarah Officer', 2, '+15550200', 'ACTIVE'),
    (3, 'vendor@vendorbridge.com', '$2a$12$R9h/lIPzMRFh41Tq5K0eQ.P8w2tLpQxW3qZJ4hL9j9zV2a8kU3m0O', 'John Vendor', 3, '+15550300', 'ACTIVE'),
    (4, 'approver@vendorbridge.com', '$2a$12$R9h/lIPzMRFh41Tq5K0eQ.P8w2tLpQxW3qZJ4hL9j9zV2a8kU3m0O', 'Emily Approver', 4, '+15550400', 'ACTIVE');

-- ============================================================================
-- Sample Vendor Profile Seed Data
-- ============================================================================
INSERT IGNORE INTO vendors (id, user_id, company_name, category, gst_number, contact_email, contact_phone, address, status, rating)
VALUES
    (1, 3, 'Acme Industrial Supplies Ltd', 'IT Hardware', '27AAAAA1111A1Z1', 'sales@acme.com', '+15550999', '123 Industrial Parkway, Suite 500, Tech City', 'APPROVED', 4.80);

-- ============================================================================
-- Catalog Products Seed Data
-- ============================================================================
INSERT IGNORE INTO products (id, sku, name, description, category, unit_of_measure, is_active)
VALUES
    (1, 'PRD-LPT-001', 'Enterprise Developer Laptop - 16GB RAM / 512GB SSD', 'High-performance work laptop for engineering and developer teams.', 'IT Hardware', 'PCS', TRUE),
    (2, 'PRD-MNT-002', 'Professional 27" 4K Monitor', 'Ultra-sharp resolution monitor with ergonomic stand and USB-C power delivery.', 'IT Hardware', 'PCS', TRUE),
    (3, 'PRD-CHR-003', 'Ergonomic Mesh Office Chair', 'High-back desk chair with adjustable lumbar support and armrests.', 'Office Furniture', 'PCS', TRUE),
    (4, 'SRV-CLD-004', 'Cloud Infrastructure Setup & Maintenance', 'Consultation and configuration service for secure cloud environment deployment.', 'IT Services', 'HOURS', TRUE);

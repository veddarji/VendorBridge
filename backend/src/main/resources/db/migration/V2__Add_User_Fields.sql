-- ============================================================================
-- Flyway V2__Add_User_Fields (MariaDB / MySQL)
-- Add columns to users table to match frontend registration payload
-- ============================================================================

ALTER TABLE users ADD COLUMN photo LONGTEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT NULL;
ALTER TABLE users ADD COLUMN additional_info VARCHAR(255) DEFAULT NULL;

package com.vendorbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for authentication response containing JWT token and user details.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/**
 * Class documentation.
 */
public class AuthResponse {

    private String token;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
    private String phone;
    private String country;
    private String photo;
    private String additionalInfo;
}

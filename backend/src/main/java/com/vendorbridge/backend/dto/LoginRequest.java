package com.vendorbridge.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for login requests.
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
}

package com.vendorbridge.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Data Transfer Object for signup/registration requests.
 */
@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private String country;
    private String password;
    private String photo;
    private String additionalInfo;
}

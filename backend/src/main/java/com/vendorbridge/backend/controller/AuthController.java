package com.vendorbridge.backend.controller;

import com.vendorbridge.backend.dto.AuthResponse;
import com.vendorbridge.backend.dto.LoginRequest;
import com.vendorbridge.backend.dto.SignupRequest;
import com.vendorbridge.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling authentication requests such as login and signup.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Constructs AuthController with the required AuthService.
     *
     * @param authService service handling authentication logic
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Authenticates a user with email and password, returning a JWT token.
     *
     * @param loginRequest payload containing email and password
     * @return ResponseEntity with AuthResponse containing JWT token and user info
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * Registers a new user with registration details, returning a JWT token.
     *
     * @param signupRequest payload containing registration fields
     * @return ResponseEntity with AuthResponse containing JWT token and user info
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest) {
        AuthResponse response = authService.signup(signupRequest);
        return ResponseEntity.ok(response);
    }
}

package com.vendorbridge.backend.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler to capture service exceptions and translate them to JSON.
 */
@RestControllerAdvice
/**
 * Class documentation.
 */
public class GlobalExceptionHandler {

    /**
     * Handles IllegalArgumentException and returns a 400 Bad Request with the error message.
     *
     * @param ex the exception containing error details
     * @return ResponseEntity containing error message map
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(
            IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
}

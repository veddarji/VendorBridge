package com.vendorbridge.backend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utility component for generating and validating JSON Web Tokens (JWT).
 */
@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expirationMs;

    /**
     * Constructs JwtTokenProvider with config values.
     *
     * @param secret       configured secret key
     * @param expirationMs token validity duration in milliseconds
     */
    public JwtTokenProvider(
            @Value("${app.jwt.secret:dGhlLXNlY3JldC1rZXktZm9yLXZlbmRv"
                    + "cmJyaWRnZS1lcnAtc2VjdXJpdHktMTIzNDU2Nzg=}")
            String secret,
            @Value("${app.jwt.expiration:86400000}") long expirationMs) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    /**
     * Generate token for user email.
     *
     * @param email subject email
     * @return generated JWT string
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    /**
     * Get email username from token.
     *
     * @param token JWT string
     * @return subject username email
     */
    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    /**
     * Validate token integrity and expiration.
     *
     * @param token JWT string
     * @return true if token is valid and unexpired, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

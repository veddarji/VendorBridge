package com.vendorbridge.backend.service;

import com.vendorbridge.backend.dto.AuthResponse;
import com.vendorbridge.backend.dto.LoginRequest;
import com.vendorbridge.backend.dto.SignupRequest;
import com.vendorbridge.backend.config.JwtTokenProvider;
import com.vendorbridge.backend.model.Role;
import com.vendorbridge.backend.model.User;
import com.vendorbridge.backend.model.enums.UserStatus;
import com.vendorbridge.backend.repository.RoleRepository;
import com.vendorbridge.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for handling login and registration operations.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    /**
     * Constructs AuthService with required dependencies.
     *
     * @param userRepository  repository for users
     * @param roleRepository  repository for roles
     * @param passwordEncoder utility to encode passwords
     * @param tokenProvider   utility to create JWTs
     */
    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Authenticates login credentials and generates session token.
     *
     * @param request login payload containing email and password
     * @return AuthResponse containing token and user profile
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new IllegalArgumentException("Account is inactive: " + user.getStatus());
        }

        String token = tokenProvider.generateToken(user.getEmail());
        String clientRole = mapDatabaseRoleToClientRole(user.getRole().getName());

        return createAuthResponse(token, user, clientRole);
    }

    /**
     * Registers a new user, hashes password, saves profile, and returns session token.
     *
     * @param request signup payload containing all registration details
     * @return AuthResponse containing token and user profile
     */
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("This email is already registered");
        }

        String dbRoleName = mapClientRoleToDatabaseRole(request.getRole());
        Role role = roleRepository.findAll().stream()
                .filter(r -> r.getName().equalsIgnoreCase(dbRoleName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + dbRoleName));

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFirstName().trim() + " " + request.getLastName().trim());
        user.setRole(role);
        user.setPhoneNumber(request.getPhone());
        user.setStatus(UserStatus.ACTIVE);
        user.setCountry(request.getCountry());
        user.setPhoto(request.getPhoto());
        user.setAdditionalInfo(request.getAdditionalInfo());

        User savedUser = userRepository.save(user);
        String token = tokenProvider.generateToken(savedUser.getEmail());

        return createAuthResponse(token, savedUser, request.getRole());
    }

    private String mapClientRoleToDatabaseRole(String clientRole) {
        if (clientRole == null) {
            return "VENDOR";
        }
        switch (clientRole.toLowerCase()) {
            case "admin":
                return "ADMIN";
            case "officer":
                return "PROCUREMENT_OFFICER";
            case "approver":
                return "APPROVER";
            case "vendor":
            default:
                return "VENDOR";
        }
    }

    private String mapDatabaseRoleToClientRole(String dbRole) {
        if (dbRole == null) {
            return "vendor";
        }
        switch (dbRole.toUpperCase()) {
            case "ADMIN":
                return "admin";
            case "PROCUREMENT_OFFICER":
                return "officer";
            case "APPROVER":
                return "approver";
            case "VENDOR":
            default:
                return "vendor";
        }
    }

    private AuthResponse createAuthResponse(String token, User user, String clientRole) {
        String firstName = "";
        String lastName = "";
        String fullName = user.getFullName();
        if (fullName != null && fullName.contains(" ")) {
            int spaceIdx = fullName.indexOf(" ");
            firstName = fullName.substring(0, spaceIdx);
            lastName = fullName.substring(spaceIdx + 1);
        } else {
            firstName = fullName;
        }

        return new AuthResponse(
                token,
                user.getEmail(),
                clientRole,
                firstName,
                lastName,
                user.getPhoneNumber(),
                user.getCountry(),
                user.getPhoto(),
                user.getAdditionalInfo()
        );
    }
}

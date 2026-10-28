package com.mountacir.controller;

import com.mountacir.model.dto.*;
import com.mountacir.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registration(@Valid @RequestBody RegistrationRequest request) {
        return authService.registration(request);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verification(@RequestBody VerifyRequest request) {
        return authService.otpVerification(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(authService.createPasswordResetToken(request.email()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        return authService.validateAndResetPassword(resetPasswordRequest);
    }
}

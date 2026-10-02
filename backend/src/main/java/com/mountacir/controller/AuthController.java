package com.mountacir.controller;

import com.mountacir.model.dto.AuthResponse;
import com.mountacir.model.dto.ForgotPasswordRequest;
import com.mountacir.model.dto.LoginRequest;
import com.mountacir.model.dto.ResetPasswordRequest;
import com.mountacir.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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
        return ResponseEntity.ok(authService.validateAndResetPassword(resetPasswordRequest));
    }
}

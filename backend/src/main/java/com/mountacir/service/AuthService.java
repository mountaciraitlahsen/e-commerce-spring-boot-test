package com.mountacir.service;


import com.mountacir.model.dto.AuthResponse;
import com.mountacir.model.dto.LoginRequest;
import com.mountacir.model.dto.ResetPasswordRequest;
import com.mountacir.model.entity.User;
import com.mountacir.repository.UserRepository;
import com.mountacir.security.JwtService;
import com.mountacir.model.dto.LoginRequest;
import com.mountacir.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.Console;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private EmailService emailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailservice) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailservice;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    public String createPasswordResetToken(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        String successMessage = "If that email exists, a reset link has been sent.";

        System.out.println("ho");
        if (userOptional.isPresent()) {
            System.out.println("hi");
            User user = userOptional.get();

            String token = UUID.randomUUID().toString();

            user.setResetToken(token);
            user.setResetTokenExpires(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            String resetLink = "https://http://localhost:5173/api/auth/reset-password" + token;

            emailService.sendEmail(user.getEmail(), "Password Reset Request", "Click this link to reset your password: " + resetLink + "\nThis link expires in 15 minutes.");
        }

        return successMessage;
    }

    public ResponseEntity<?> validateAndResetPassword(ResetPasswordRequest resetPasswordRequest) {

        Optional<User> userOptional = userRepository.findByResetToken(resetPasswordRequest.Token());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid or expired token."));
        }

        User user = userOptional.get();

        if (user.getResetTokenExpires().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(400).body(Map.of("error", "This link has expired."));
        }

        user.setPasswordHash(passwordEncoder.encode(resetPasswordRequest.newPassword()));

        user.setResetToken(null);
        user.setResetTokenExpires(null);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully. You can now log in."));
    }
}

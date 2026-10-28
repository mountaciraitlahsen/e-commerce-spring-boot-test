package com.mountacir.service;


import com.mountacir.model.dto.*;
import com.mountacir.model.entity.User;
import com.mountacir.repository.UserRepository;
import com.mountacir.security.JwtService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private EmailService emailService;
    private TemplateEngine templateEngine;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailservice, TemplateEngine templateEngine) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailservice;
        this.templateEngine = templateEngine;
    }

    public ResponseEntity<RegistrationResponse> registration(RegistrationRequest request) {
        Optional<User> userOptional =
                userRepository.findByEmail(request.email());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            emailService.sendEmail(user.getEmail(), "Notice: Someone attempted to create an account using your email", "Hi " + user.getName() + "," + "\nWe noticed someone recently tried to register a new account using your email address " + user.getEmail() + "." + "\n\nIf this was not you, you don't need to take any action—no account was created or compromised. However, if you ever suspect unauthorized activity on your own account, we recommend updating your password right away." + "\n\nBest regards," + "\nMonTech Team");
        }
        sendVerificationOtp(request);
        return ResponseEntity.ok(new RegistrationResponse(
                true,
                "Registration processing. Please check your email for confirmation steps."
        ));
    }

    public void sendVerificationOtp(RegistrationRequest request) {
        String otpCode = String.format("%06d", new Random().nextInt(999999));

        Context context = new Context();
        context.setVariable("name", request.username());
        context.setVariable("otpCode", otpCode);

        User user = new User();
        user.setEmail(request.email());
        user.setName(request.username());
        user.setOtp(otpCode);
        user.setResetTokenExpires(LocalDateTime.now().plusMinutes(10));
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        String htmlContent = templateEngine.process("otp-template", context);

        try {
            emailService.sendHtmlEmail(request.email(), "Verify Your Account Registration", htmlContent);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public ResponseEntity<?> otpVerification(VerifyRequest verifyRequest) {

        Optional<User> userOptional = userRepository.findByEmail(verifyRequest.email());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid or expired otp."));
        }

        User user = userOptional.get();

        if (user.getOtpExpires().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(400).body(Map.of("error", "This link has otp."));
        }

        user.setVerified(true);

        user.setOtp(null);
        user.setOtpExpires(null);
        userRepository.save(user);
        return ResponseEntity.ok(new VerifyResponse(user.getId(), user.getEmail(), user.getName(), LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash()) || !user.getVerified()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }

    public String createPasswordResetToken(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        String successMessage = "If that email exists, a reset link has been sent.";

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            String token = UUID.randomUUID().toString();

            user.setResetToken(token);
            user.setResetTokenExpires(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            String resetLink = "https://http://localhost:5173/api/auth/reset-password?token=" + token;

            emailService.sendEmail(user.getEmail(), "Password Reset Request", "Click this link to reset your password: " + resetLink + "\nThis link expires in 15 minutes.");
        }

        return successMessage;
    }

    public ResponseEntity<?> validateAndResetPassword(ResetPasswordRequest resetPasswordRequest) {

        Optional<User> userOptional = userRepository.findByResetToken(resetPasswordRequest.token());

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

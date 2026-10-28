package com.mountacir.model.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Cart cart;

    @Column(name = "reset_token", nullable = true)
    private String resetToken;

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setOtpExpires(LocalDateTime otpExpires) {
        this.otpExpires = otpExpires;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getOtpExpires() {
        return otpExpires;
    }

    @Column(name = "reset_token_expires", nullable = true)
    private LocalDateTime resetTokenExpires;

    @Column(name = "otp", nullable = true)
    private String otp;

    @Column(name = "otp_expires", nullable = true)
    private LocalDateTime otpExpires;

    @Column(name = "is_verified", nullable = true)
    private Boolean isVerified;

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public void setVerificationTokenExpires(LocalDateTime verificationTokenExpires) {
        this.verificationTokenExpires = verificationTokenExpires;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public LocalDateTime getVerificationTokenExpires() {
        return verificationTokenExpires;
    }

    @Column(name = "verification_token_expires", nullable = true)
    private LocalDateTime verificationTokenExpires;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public void setResetTokenExpires(LocalDateTime resetTokenExpires) {
        this.resetTokenExpires = resetTokenExpires;
    }

    public String getResetToken() {
        return resetToken;
    }

    public LocalDateTime getResetTokenExpires() {
        return resetTokenExpires;
    }
}

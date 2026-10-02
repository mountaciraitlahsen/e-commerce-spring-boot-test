package com.mountacir.model.dto;

public record ResetPasswordRequest(String token, String newPassword) {
}

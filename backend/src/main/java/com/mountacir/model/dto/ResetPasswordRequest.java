package com.mountacir.model.dto;

public record ResetPasswordRequest(String Token, String newPassword) {
}

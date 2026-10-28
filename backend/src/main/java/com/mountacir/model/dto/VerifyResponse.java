package com.mountacir.model.dto;

import java.time.Instant;

public record VerifyResponse(Long id, String email, String name, Instant createdAt) {
}
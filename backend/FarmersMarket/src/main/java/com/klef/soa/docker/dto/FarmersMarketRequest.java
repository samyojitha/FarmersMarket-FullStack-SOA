package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;

public record FarmersMarketRequest(
    @NotBlank(message = "Market name is required")
    String marketName,

    @NotBlank(message = "Location is required")
    String location,

    @NotNull(message = "Stall count is required")
    @Min(value = 0, message = "Stall count cannot be negative")
    Integer stallCount,

    @NotBlank(message = "Market day is required")
    String marketDay,

    @NotNull(message = "Attended status is required")
    Boolean attended
) {}
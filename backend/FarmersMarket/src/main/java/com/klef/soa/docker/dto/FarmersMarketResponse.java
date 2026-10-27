package com.klef.soa.docker.dto;

public record FarmersMarketResponse(
    Long id,
    String marketName,
    String location,
    Integer stallCount,
    String marketDay,
    Boolean attended
) {}
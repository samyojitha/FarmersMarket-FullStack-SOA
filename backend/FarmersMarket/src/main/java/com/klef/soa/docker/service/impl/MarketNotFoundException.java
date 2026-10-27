package com.klef.soa.docker.service.impl;

public class MarketNotFoundException extends RuntimeException {

    public MarketNotFoundException(Long id) {
        super("Farmers market not found with ID: " + id);
    }
}
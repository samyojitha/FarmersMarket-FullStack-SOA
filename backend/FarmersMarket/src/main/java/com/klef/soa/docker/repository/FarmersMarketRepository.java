package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.soa.docker.entity.FarmersMarket;

public interface FarmersMarketRepository
        extends JpaRepository<FarmersMarket, Long> {
}
package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.entity.FarmersMarket;

public interface FarmersMarketService {
    FarmersMarket addMarket(FarmersMarket market);
    List<FarmersMarket> getAllMarkets();
    FarmersMarket getMarketById(Long id);
    FarmersMarket updateMarket(Long id, FarmersMarket market);
    void deleteMarket(Long id);
}
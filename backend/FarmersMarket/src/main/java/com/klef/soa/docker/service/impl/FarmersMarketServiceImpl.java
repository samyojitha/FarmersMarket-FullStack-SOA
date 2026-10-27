package com.klef.soa.docker.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.klef.soa.docker.entity.FarmersMarket;
import com.klef.soa.docker.repository.FarmersMarketRepository;
import com.klef.soa.docker.service.FarmersMarketService;

@Service
public class FarmersMarketServiceImpl implements FarmersMarketService {

    private final FarmersMarketRepository repository;

    public FarmersMarketServiceImpl(FarmersMarketRepository repository) {
        this.repository = repository;
    }

    @Override
    public FarmersMarket addMarket(FarmersMarket market) {
        market.setId(null);
        return repository.save(market);
    }

    @Override
    public List<FarmersMarket> getAllMarkets() {
        return repository.findAll();
    }

    @Override
    public FarmersMarket getMarketById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new MarketNotFoundException(id));
    }

    @Override
    public FarmersMarket updateMarket(Long id, FarmersMarket market) {
        FarmersMarket existing = getMarketById(id);
        existing.setMarketName(market.getMarketName());
        existing.setLocation(market.getLocation());
        existing.setStallCount(market.getStallCount());
        existing.setMarketDay(market.getMarketDay());
        existing.setAttended(market.getAttended());
        return repository.save(existing);
    }

    @Override
    public void deleteMarket(Long id) {
        repository.delete(getMarketById(id));
    }
}
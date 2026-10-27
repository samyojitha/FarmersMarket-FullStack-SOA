package com.klef.soa.docker.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.klef.soa.docker.dto.*;
import com.klef.soa.docker.entity.FarmersMarket;
import com.klef.soa.docker.service.FarmersMarketService;

@RestController
@RequestMapping("/api/markets")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class FarmersMarketController {

    private final FarmersMarketService service;

    public FarmersMarketController(FarmersMarketService service) {
        this.service = service;
    }

    private FarmersMarketResponse toResponse(FarmersMarket m) {
        return new FarmersMarketResponse(
            m.getId(), m.getMarketName(), m.getLocation(),
            m.getStallCount(), m.getMarketDay(), m.getAttended()
        );
    }

    @PostMapping
    public ResponseEntity<FarmersMarketResponse> addMarket(
            @Valid @RequestBody FarmersMarketRequest request) {
        FarmersMarket m = new FarmersMarket();
        m.setMarketName(request.marketName());
        m.setLocation(request.location());
        m.setStallCount(request.stallCount());
        m.setMarketDay(request.marketDay());
        m.setAttended(request.attended());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toResponse(service.addMarket(m)));
    }

    @GetMapping
    public List<FarmersMarketResponse> getAllMarkets() {
        return service.getAllMarkets().stream()
                .map(this::toResponse).toList();
    }

    @GetMapping("/{id}")
    public FarmersMarketResponse getMarketById(@PathVariable Long id) {
        return toResponse(service.getMarketById(id));
    }

    @PutMapping("/{id}")
    public FarmersMarketResponse updateMarket(
            @PathVariable Long id,
            @Valid @RequestBody FarmersMarketRequest request) {
        FarmersMarket m = new FarmersMarket();
        m.setMarketName(request.marketName());
        m.setLocation(request.location());
        m.setStallCount(request.stallCount());
        m.setMarketDay(request.marketDay());
        m.setAttended(request.attended());

        return toResponse(service.updateMarket(id, m));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarket(@PathVariable Long id) {
        service.deleteMarket(id);
        return ResponseEntity.noContent().build();
    }
}
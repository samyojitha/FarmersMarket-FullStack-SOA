package com.klef.soa.docker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "farmers_market")
public class FarmersMarket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Market name is required")
    private String marketName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Stall count is required")
    @Min(value = 0, message = "Stall count cannot be negative")
    private Integer stallCount;

    @NotBlank(message = "Market day is required")
    private String marketDay;

    @NotNull(message = "Attended status is required")
    private Boolean attended;

    public FarmersMarket() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMarketName() { return marketName; }
    public void setMarketName(String marketName) {
        this.marketName = marketName;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getStallCount() { return stallCount; }
    public void setStallCount(Integer stallCount) {
        this.stallCount = stallCount;
    }

    public String getMarketDay() { return marketDay; }
    public void setMarketDay(String marketDay) {
        this.marketDay = marketDay;
    }

    public Boolean getAttended() { return attended; }
    public void setAttended(Boolean attended) {
        this.attended = attended;
    }
}
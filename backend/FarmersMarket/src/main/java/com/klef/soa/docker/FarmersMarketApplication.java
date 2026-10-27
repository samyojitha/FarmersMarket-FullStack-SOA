package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FarmersMarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmersMarketApplication.class, args);
		System.out.println("Farmers Market Running...");
	}

}

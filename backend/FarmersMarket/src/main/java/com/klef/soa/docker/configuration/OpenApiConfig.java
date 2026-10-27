package com.klef.soa.docker.configuration;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "FarmersMarket API",
        version = "1.0",
        description = "FarmersMarket CRUD REST API"
    )
)
public class OpenApiConfig {}
package com.soccer.bff;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securitygWebFilterChain(
            ServerHttpSecurity http) {
        return http.authorizeExchange()
                .anyExchange().permitAll()
                .and().build();
    }
}

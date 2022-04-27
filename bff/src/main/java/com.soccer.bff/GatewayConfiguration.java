package com.soccer.bff;

import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Optional;

@Configuration
public class GatewayConfiguration {
    private static final String BEARER_TOKEN = "Bearer";
    private static final Logger logger = LoggerFactory.getLogger(BffApplication.class);

    @Bean
    @Order(0)
    public GlobalFilter postGlobalFilter() {
        return (exchange, chain) -> chain.filter(exchange)
                .then(Mono.fromRunnable(() -> {
                    logger.info("Setting bearer token in session");

                    Optional<String> tokenHeader = exchange.getResponse().getHeaders().getOrDefault("X-Auth-Token", Collections.emptyList()).stream().findFirst();

                    tokenHeader.ifPresent(t -> {
                        exchange.getAttributes().put(BEARER_TOKEN, t);
                    });
                })).then(exchange.getSession()).flatMap(WebSession::save);
    }


    @Component
    public static class AddBearerTokenToRequestFilter implements GlobalFilter {
        @Override
        public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

            logger.info("Adding Bearer token to request");

            String bt = exchange.getAttributeOrDefault(BEARER_TOKEN, "");

            if (Strings.isNotEmpty(bt)) {
                exchange.getRequest().mutate().header(HttpHeaders.AUTHORIZATION, BEARER_TOKEN + " " + bt);
            }

            return chain.filter(exchange);
        }

    }
}

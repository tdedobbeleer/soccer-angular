package com.soccer.bff;

import io.netty.handler.logging.LogLevel;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import reactor.netty.http.client.HttpClient;
import reactor.netty.transport.logging.AdvancedByteBufFormat;


@SpringBootApplication
public class BffApplication {

    public static void main(String[] args) {
        SpringApplication.run(BffApplication.class, args);
    }

    @Bean
    HttpClient httpClient() {
        return HttpClient.create().wiretap("LoggingFilter", LogLevel.INFO, AdvancedByteBufFormat.TEXTUAL);
    }
}

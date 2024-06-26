package com.olbl.stickeymain.global.config;

import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    // CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 허용할 출처
        List<String> origins = List.of("http://j10d211.p.ssafy.io", "https://j10d211.p.ssafy.io",
            "http://localhost:3000", "https://localhost:3000", "http://192.168.100.143:3000");

        registry.addMapping("/**") // 모든 경로에 대해
            .allowedOrigins(String.join(",", origins)) // 허용할 출처
            .allowedMethods("*"); // 모든 HTTP 메소드 허용

    }
}
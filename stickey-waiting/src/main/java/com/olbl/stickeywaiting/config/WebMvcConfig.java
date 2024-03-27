package com.olbl.stickeywaiting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
            .allowedOrigins("*") // 허용할 출처
            .allowedHeaders("*")
            .allowedMethods("*") // 허용할 HTTP 메소드
            .allowCredentials(false) // 쿠키 및 인증 정보 포함 허용
            .maxAge(3000); // 원하는 시간만큼 pre-flight 리퀘스트 캐싱
    }
}
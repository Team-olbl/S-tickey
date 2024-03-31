package com.olbl.stickeymain.global.config;

import com.olbl.stickeymain.global.interceptor.GameSessionInterceptor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final RedisTemplate redisTemplate;

    // CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 허용할 출처
        List<String> origins = List.of("http://j10d211.p.ssafy.io", "https://j10d211.p.ssafy.io",
            "http://localhost:3000", "https://localhost:3000");

        registry.addMapping("/**") // 모든 경로에 대해
            .allowedOrigins(String.join(",", origins)) // 허용할 출처
            .allowedMethods("*"); // 모든 HTTP 메소드 허용

    }

    // Interceptor 설정
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new GameSessionInterceptor(redisTemplate))
            .addPathPatterns("/games/**")
            .excludePathPatterns(List.of("/games", "/games/clubs", "/games/wait/**"));
    }
}
package com.olbl.stickeymain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.olbl.stickeymain.domain.user.repository.PreferenceRepository;
import com.olbl.stickeymain.global.jwt.JWTUtil;
import com.olbl.stickeymain.global.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final CorsFilter corsFilter;
    private final PreferenceRepository preferenceRepository;
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;

    // 비밀번호 암호화를 위한 BCryptPasswordEncoder Bean 등록
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
        throws Exception {
        return configuration.getAuthenticationManager();
    }

    // SecurityFilter Chain 등록
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable);

        http
            .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));

        http
            .sessionManagement(sessionManagementConfigurer ->
                sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
            .httpBasic(
                httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer.disable());

        http
            .formLogin(form -> form.disable());

        http // 경로별 권한 설정, 배포 직전에 변경할 예정
            .authorizeHttpRequests((requests) -> requests
                .anyRequest().permitAll()
            );

        http // CORS 필터
            .addFilter(corsFilter);

        http // 로그인 필터
            .addFilterAt(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,
                    objectMapper, preferenceRepository),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}

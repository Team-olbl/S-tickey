package com.olbl.stickeymain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.olbl.stickeymain.domain.user.repository.PreferenceRepository;
import com.olbl.stickeymain.global.jwt.JWTFilter;
import com.olbl.stickeymain.global.jwt.JWTUtil;
import com.olbl.stickeymain.global.jwt.LoginFilter;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
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
                .requestMatchers("/users/login", "/users/signup").permitAll()
                .anyRequest().authenticated()
            );

        http // CORS 설정
            .cors((corsCustomizer) -> corsCustomizer.configurationSource(
                new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration configuration = new CorsConfiguration();

                        // 허용할 출처
                        configuration.setAllowedOrigins(
                            Collections.singletonList("https://j10d211.p.ssafy.io"));
                        configuration.setAllowedOrigins(
                            Collections.singletonList("http://localhost:3000"));

                        // 허용할 HTTP 메소드
                        configuration.setAllowedMethods(Collections.singletonList("*"));

                        // 자격 증명 정보 허용 설정
                        configuration.setAllowCredentials(true);

                        // 허용 헤더 설정
                        configuration.setAllowedHeaders(Collections.singletonList("*"));

                        // Pre-flight 요청 캐싱 시간 설정
                        configuration.setMaxAge(3000L);

                        // 브라우저에 노출할 헤더 설정
                        configuration.setExposedHeaders(Arrays.asList("access", "refresh"));
                        return configuration;
                    }
                }));

        http // 로그인 필터
            .addFilterAt(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,
                    objectMapper, preferenceRepository),
                UsernamePasswordAuthenticationFilter.class);

        http // 토큰 검증 필터
            .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        return http.build();
    }

}

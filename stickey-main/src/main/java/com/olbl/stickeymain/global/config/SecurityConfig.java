package com.olbl.stickeymain.global.config;

import com.olbl.stickeymain.global.jwt.JWTUtil;
import com.olbl.stickeymain.global.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

        http
            .authorizeHttpRequests((requests) -> requests
                // Swagger 페이지 (O)
                .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()

                // 메인 페이지, 종목 별 페이지, 후원 페이지, 회원가입 페이지, 로그인 페이지 - 모두 접근 허용
                .requestMatchers("/", "/games/**", "/support/**", "/users/signup/**",
                    "/users/login", "/users/logout").permitAll()

                // 예매 상세 페이지, 마이 티켓, 개인 마이 페이지 - 개인 유저만 접근 허용
                .requestMatchers("/tickets/**", "/items/**", "/users/profile/**")
                .hasRole("INDIVIDUAL")

                // 단체 마이 페이지 -  단체 유저만 접근 허용 (O)
                .requestMatchers("/organizations/profile/**").hasRole("ORGANIZATION")

                // 알림 페이지 - 개인, 단체 유저만 접근 허용
                .requestMatchers("/alarm/**").hasAnyRole("INDIVIDUAL", "ORGANIZATION")

                // 관리자 페이지 - 관리자만 접근 허용 (O)
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // 그 외 모든 요청은 인증 필요
                .anyRequest().authenticated()
            );

        http // CORS 필터
            .addFilter(corsFilter);

        http // 로그인 필터
            .addFilterAt(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}

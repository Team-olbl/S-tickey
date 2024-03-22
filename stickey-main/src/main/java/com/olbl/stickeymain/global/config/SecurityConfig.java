package com.olbl.stickeymain.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  // 비밀번호 암호화를 위한 인코더 등록
  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // 시큐리티 필터 등록
  @Bean
  protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)      // csrf disable
        .formLogin(AbstractHttpConfigurer::disable) // form-login disable
        .httpBasic(AbstractHttpConfigurer::disable) // http basic 인증 disable
        .headers(header -> header.frameOptions(     // X-Frame-Options disable
            HeadersConfigurer.FrameOptionsConfig::disable))
        .sessionManagement(
            SessionManagementConfigurer -> SessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS)) // session disable
        .authorizeHttpRequests(authorizeRequests -> // 경로별 인가 작업
            authorizeRequests
//                Security Filter는 개발이 어느정도 완료되면 해제
//                .requestMatchers("/user").authenticated()  // 개인 유저
//                .requestMatchers("/user/organization").hasAnyRole("ORGANIZATION")     // 단체
//                .requestMatchers("/admin").hasAnyRole("ADMIN")     // 관리자 권한 확인
                .anyRequest().permitAll());
    return http.build();
  }

}

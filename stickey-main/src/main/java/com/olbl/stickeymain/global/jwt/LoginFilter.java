package com.olbl.stickeymain.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.olbl.stickeymain.domain.user.entity.Token;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

@Slf4j
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RedisTemplate redisTemplate;
    private final String USERNAME_KEY = "email";
    private final String PASSWORD_KEY = "password";
    private final Long ACCESS_EXPIRED_MS = 600000L;
    private final Long REFRESH_EXPIRED_MS = 86400000L;

    // 회원 검증
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws AuthenticationException {

        UsernamePasswordAuthenticationToken authToken;

        try {
            // 클라이언트가 보낸 HTTP 요청 본문을 받아 Map형태로 반환
            String messageBody = StreamUtils.copyToString(request.getInputStream(),
                StandardCharsets.UTF_8);
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> usernamePasswordMap = objectMapper.readValue(messageBody,
                Map.class);

            String email = usernamePasswordMap.get(USERNAME_KEY);
            String password = usernamePasswordMap.get(PASSWORD_KEY);

            // Spring Security 검증을 위한 Token 생성
            authToken = new UsernamePasswordAuthenticationToken(email, password);
        } catch (Exception e) {
            e.printStackTrace();
            throw new AuthenticationServiceException(
                "Request Content-Type is not application/json");
        }

        // AuthenticationManager에서 token 검증
        Authentication authentication = authenticationManager.authenticate(authToken);

        // 권한 관리를 위해 UserDetails를 세션에 담는다
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("로그인 유저 이름 : {}", userDetails.getUsername());

        return authentication;
    }

    // 로그인 성공 시 실행
    // 여기서 Json Web Token(JWT)가 발급된다
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain, Authentication authResult)
        throws IOException, ServletException {

        // UserDetails에서 유저 정보 획득
        CustomUserDetails customUserDetails = (CustomUserDetails) authResult.getPrincipal();
        String username = customUserDetails.getUsername();
        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authResult.getAuthorities().iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        // JWT 토큰 발급 (Access, Refresh)
        String access = jwtUtil.createJWT("access", username, role, ACCESS_EXPIRED_MS);
        String refresh = jwtUtil.createJWT("refresh", username, role, REFRESH_EXPIRED_MS);

        // Refresh 토큰 저장
        addRefreshEntity(username, refresh, REFRESH_EXPIRED_MS);

        // 응답 헤더와 쿠키에 JWT 토큰 추가
        response.setHeader("access", access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    // 로그인 실패 시 실행
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, AuthenticationException failed)
        throws IOException, ServletException {

        // 로그인 실패 시, 401 응답 코드 반환
        response.setStatus(401);

        log.info("Login Fail : request = {}", request);
    }

    // 쿠키 생성 메소드
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        return cookie;
    }

    // Refresh Token 저장
    private void addRefreshEntity(String email, String refresh, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);
        Token token = Token.builder()
            .email(email)
            .refresh(refresh)
            .expiration(date.toString())
            .build();

        // Redis에 Refresh Token 저장
        redisTemplate.opsForHash().put("refresh", email, refresh);
    }
}

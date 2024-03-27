package com.olbl.stickeymain.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.olbl.stickeymain.domain.user.dto.ClubInfoDto;
import com.olbl.stickeymain.domain.user.dto.LoginRes;
import com.olbl.stickeymain.domain.user.repository.PreferenceRepository;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
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
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final ObjectMapper objectMapper;
    private final PreferenceRepository preferenceRepository;
    private final String USERNAME_KEY = "email";
    private final String PASSWORD_KEY = "password";

    // Security 기본 로그인 URL 수정을 위해 생성자 직접 작성
    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,
        ObjectMapper objectMapper, PreferenceRepository preferenceRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
        this.preferenceRepository = preferenceRepository;
        this.setFilterProcessesUrl("/users/login");
    }

    // 회원 검증
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws AuthenticationException {

        UsernamePasswordAuthenticationToken authToken;

        try {
            // 클라이언트가 보낸 HTTP 요청 본문을 받아 Map형태로 반환
            String messageBody = StreamUtils.copyToString(request.getInputStream(),
                StandardCharsets.UTF_8);
            Map<String, String> usernamePasswordMap = objectMapper.readValue(messageBody,
                Map.class);

            // Spring Security 검증을 위한 Token 생성
            String email = usernamePasswordMap.get(USERNAME_KEY);
            String password = usernamePasswordMap.get(PASSWORD_KEY);
            authToken = new UsernamePasswordAuthenticationToken(email, password);

        } catch (Exception e) {
            // TODO: Filter Exception 만들어서 던지기
            throw new AuthenticationServiceException(
                "Request Content-Type is not application/json");
        }

        // AuthenticationManager에서 Token을 전달하여 인증 처리
        Authentication authentication = authenticationManager.authenticate(authToken);

        // 권한 관리를 위해 UserDetails를 시큐리티 세션에 담는다
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("Login : user name = {}", userDetails.getUsername()); // pk
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
        String id = customUserDetails.getUsername(); // PK
        GrantedAuthority auth = authResult.getAuthorities().iterator().next();
        String role = auth.getAuthority(); // ROLE

        log.info("[LoginFilter] User {}'s role : {}", id, role);

        // JWT 토큰 발급 (Access, Refresh)
        String access = jwtUtil.createJWT("access", id, role, 10800000L);
        String refresh = jwtUtil.createJWT("refresh", id, role, 259200000L);

        // Redis에 Refresh 토큰 저장
        jwtUtil.addRefreshEntity(id, refresh);

        // 로그인 응답 생성
        response.setHeader("access", access);
        response.setHeader("refresh", refresh);
        response.setStatus(HttpStatus.OK.value());

        List<ClubInfoDto> preferences = preferenceRepository.findAllByUserId(Integer.parseInt(id));
        LoginRes loginRes = LoginRes.builder()
            .id(Integer.parseInt(id))
            .preferences(preferences)
            .build();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(loginRes));
        response.getWriter().flush();
    }

    // 로그인 실패 시 실행
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, AuthenticationException failed)
        throws IOException, ServletException {

        // 로그인 실패 시, 401 응답 코드 반환
        response.setStatus(401);
        log.info("[LoginFilter] Login Fail", request);
    }
}

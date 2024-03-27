package com.olbl.stickeymain.global.jwt;

import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter { // 동일 요청 내에서는 필터가 한 번만 수행된다

    private final JWTUtil jwtUtil;

    //JWT 토큰 검증
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        // 요청 헤더에서 Authorization 토큰 탐색
        String token = request.getHeader("Authorization");

        // Authorization 토큰이 없거나, Bearer로 시작하지 않는 경우
        if (token == null || !token.startsWith("Bearer ")) {

            // 다음 필터로 요청을 전달하거나, 요청에 대한 실제 서블릿 또는 리소스로 전달
            filterChain.doFilter(request, response);

            // 조건에 해당되면 메소드 종료
            return;
        }

        // AccessToken 유효성 검사
        String accessToken = token.split(" ")[1];
        if (!jwtUtil.validateToken(accessToken, "access")) {
            // response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰 검증이 완료되면 ID, ROLE 값 획득
        String id = jwtUtil.getUsername(accessToken);
        String role = jwtUtil.getRole(accessToken);

        log.info("id : {}", id);
        log.info("role : {}", role);

        User user = User.builder()
            .id(Integer.parseInt(id))
            .role(Role.valueOf(role.split("_")[1]))
            .build();

        // UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
            customUserDetails.getAuthorities());

        // 세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}

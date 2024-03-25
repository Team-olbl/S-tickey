package com.olbl.stickeymain.global.jwt;

import com.olbl.stickeymain.domain.user.entity.Role;
import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.global.auth.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
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
        // 요청 헤더에서 Access 토큰 탐색 및 검증
        String accessToken = request.getHeader("Authorization");

        // 요청 헤더에서 Access 토큰 검증, 없다면 다음 필터로 넘긴다
        if (accessToken == null) {
            log.info("유효한 토큰이 존재하지 않습니다 - JWTFilter");
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("accessToken1 : " + accessToken);

        // JWT 만료 시간 검증
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {

            // response body
            PrintWriter writer = response.getWriter();
            writer.println("Access Token Expired");

            // response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // JWT 검증
        // 토큰이 Access Token인지 확인한다
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {

            // response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // Username, Role값 획득
        String id = jwtUtil.getUsername(accessToken);
        String role = jwtUtil.getRole(accessToken);

        User user = User.builder()
            .id(Integer.parseInt(id))
            .role(Role.valueOf(role.split("_")[1]))
            .build();

        System.out.println("id : " + id);
        System.out.println("role : " + role);

        // UserDetails에 회원 정보 객체 담기
        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
            customUserDetails.getAuthorities());

        // 세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}

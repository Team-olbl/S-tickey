package com.olbl.stickeymain.global.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final RedisTemplate redisTemplate;
    private final JWTUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response,
        FilterChain chain) throws IOException, ServletException {
        // Logout 요청이 아니라면 그냥 넘긴다
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\/logout$")) {
            chain.doFilter(request, response);
            return;
        }

        // Token 검증
        String token = request.getHeader("refresh");
        if (token == null || !token.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // RefreshToken 검증
        String refreshToken = token.split(" ")[1];
        String category = jwtUtil.getCategory(refreshToken);
        if (!jwtUtil.validateToken(refreshToken, "refresh")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 로그아웃 진행
        log.info("[CustomLogoutHandler] 로그아웃 진행");
        jwtUtil.removeRefreshEntity(jwtUtil.getUsername(refreshToken));
        response.setStatus(HttpServletResponse.SC_OK);
    }
}

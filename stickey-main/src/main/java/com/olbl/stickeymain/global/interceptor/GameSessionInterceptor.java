package com.olbl.stickeymain.global.interceptor;


import com.olbl.stickeymain.global.auth.CustomUserDetails;
import com.olbl.stickeymain.global.result.error.ErrorCode;
import com.olbl.stickeymain.global.result.error.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

// 예매에 필요한 API를 호출할 때, 참가열에 있는지 확인하는 인터셉터
@Slf4j
@Component
@RequiredArgsConstructor
public class GameSessionInterceptor implements HandlerInterceptor {

    private final RedisTemplate redisTemplate;
    private final String runKey = "run::";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) throws Exception {
        // 경기 및 유저 정보 획득
        Map pathVariables = (Map) request.getAttribute(
            HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String gameId = (String) pathVariables.get("id");

        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        int userId = userDetails.getId();

        // 참가열에 없으면 더 이상 진행하지 않는다
        if (redisTemplate.opsForZSet().rank(runKey + gameId, String.valueOf(userId)) == null) {
            log.info("[GameSessionInterceptor] 참가열에 존재하지 않는 유저 요청 : {}", userId);
            throw new BusinessException(ErrorCode.NOT_IN_RUNNING_QUEUE);
        }
        return true;
    }
}

package com.olbl.stickeymain.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JWTUtil {

    private RedisTemplate redisTemplate;

    private Key key;

    public JWTUtil(@Value("${jwt.secret}") String secret, RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
        byte[] byteSecretKey = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(byteSecretKey);
    }

    // Username 확인
    public String getUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("id", String.class);
    }

    // Role 확인
    public String getRole(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("role", String.class);
    }

    // 토큰 카테고리 확인
    public String getCategory(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("category", String.class);
    }

    // 만료 여부 확인
    public boolean isExpired(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration()
            .before(new Date());
    }

    // JWT 토큰 발급
    public String createJWT(String category, String username, String role, Long expiredMs) {
        Claims claims = Jwts.claims();
        claims.put("category", category);
        claims.put("id", username);
        claims.put("role", role);

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }


    // Redis에 Refresh Token 저장
    public void addRefreshEntity(String id, String refresh) {
        redisTemplate.opsForHash().put("refresh", id, refresh);
    }

    // Redis에서 현재 유효한 Refresh Token 조회
    public String getRefreshEntity(String id) {
        return (String) redisTemplate.opsForHash().get("refresh", id);
    }

    // 유저에 대한 RefreshToken 삭제
    public void removeRefreshEntity(String id) {
        redisTemplate.opsForHash().delete("refresh", id);
    }

    // 토큰 유효성 검사
    public boolean validateToken(String token, String originalCategory) {
        try {
            // 유효성 검사
            Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();

            // 토큰 카테고리 검사
            String category = (String) claims.get("category");
            if (!originalCategory.equals(category)) {
                log.info("[JWTUtil] Token Not Exist");
                return false;
            }

            return true;
        } catch (ExpiredJwtException e) {
            log.info("[JWTUtil] Token Expired");
            // TODO: Filter Exception 구현
        } catch (SignatureException | MalformedJwtException e) {
            log.info("[JWTUtil] Signature Invalid");
            // TODO: Filter Exception 구현
        } catch (IllegalArgumentException e) {
            log.info("[JWTUtil] JWT 토큰이 잘못되었습니다.");
            // TODO: Filter Exception 구현
        } catch (NullPointerException e) {
            log.info("[JWTUtil] JWT is null");
            // TODO: Filter Exception 구현
        }

        return false;
    }
}

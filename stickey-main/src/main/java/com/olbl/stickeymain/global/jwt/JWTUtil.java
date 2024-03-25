package com.olbl.stickeymain.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

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
}

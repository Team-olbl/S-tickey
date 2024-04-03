package com.olbl.stickeywaiting.util;

import java.util.Iterator;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

// Redis 유틸 클래스
@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, String> redisTemplate;

    // Redis에서 특정 형식의 Key 모두 조회
    public Iterator<String> getKeys(String baseKey) {
        return redisTemplate.keys(baseKey + "*").iterator();
    }

    // Sorted Set에 유저 추가
    public boolean addToQueue(String key, String id, double score) {
        return redisTemplate.opsForZSet().add(key, id, score);
    }

    // Sorted Set에서 유저 삭제
    public boolean removeFromQueue(String key, String id) {
        boolean result = (redisTemplate.opsForZSet().remove(key, id) > 0) ? true : false;
        return result;
    }

    // Sorted Set에서 유저 순위 조회
    public Long getRankFromQueue(String key, int id) {
        return redisTemplate.opsForZSet().rank(key, String.valueOf(id));
    }

    // Sorted Set 크기 조회
    public Long sizeOfQueue(String key) {
        return redisTemplate.opsForZSet().size(key);
    }

    // Sorted Set에서 범위를 지정해서 조회
    public Set<String> getFromQueueByRange(String key, Long start, Long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }

    // Sorted Set에서 Score로 범위를 지정해서 member를 삭제
    public void removeFromQueueByRange(String key, Long start, Long end) {
        redisTemplate.opsForZSet().removeRangeByScore(key, start, end);
    }

}

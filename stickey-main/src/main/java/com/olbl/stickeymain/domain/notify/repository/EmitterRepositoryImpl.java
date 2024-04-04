package com.olbl.stickeymain.domain.notify.repository;

import com.olbl.stickeymain.domain.notify.entity.Notify;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class EmitterRepositoryImpl implements EmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>(); //emitter 저장
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>(); // event 저장

    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) { //emitter 저장
        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void saveEventCache(String eventCacheId, Notify event) { //event 저장
        eventCache.put(eventCacheId, event);
    }

    @Override
    public void deleteById(String emitterId) {
        emitters.remove(emitterId);
    }


    @Override
    public Map<String, Object> findAllEventCacheStartWithByUserId(int userId) {
        return eventCache.entrySet().stream()
            .filter(entry -> entry.getKey().startsWith(String.valueOf(userId)))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public Map<String, SseEmitter> findAllEmitterStartWithByUserId(
        int userId) { // 해당 회원과 관련된 모든 이벤트를 찾음
        return emitters.entrySet().stream()
            .filter(entry -> entry.getKey().startsWith(String.valueOf(userId)))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

}

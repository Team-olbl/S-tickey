package com.olbl.stickeymain.domain.notify.repository;

import com.olbl.stickeymain.domain.notify.entity.Notify;
import java.util.Map;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {

    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void deleteById(String emitterId);

    Map<String, Object> findAllEventCacheStartWithByUserId(int userId);

    Map<String, SseEmitter> findAllEmitterStartWithByUserId(int userId);

    void saveEventCache(String key, Notify notification);
}

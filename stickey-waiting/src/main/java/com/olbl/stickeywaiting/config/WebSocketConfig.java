package com.olbl.stickeywaiting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket 메시지 활성화
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Message Broker 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // 서버가 클라이언트에 보낼 때의 PREFIX
        registry.setApplicationDestinationPrefixes("/games/wait"); // 클라이언트가 서버로 보낼 때의 PREFIX
    }

    // WebSocket Stomp Endpoint 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/reserve")
            .setAllowedOriginPatterns("*");
    }

}

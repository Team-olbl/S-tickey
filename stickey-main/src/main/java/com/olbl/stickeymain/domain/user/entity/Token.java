package com.olbl.stickeymain.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Token {

    private String id;
    private String refresh;
    private String expiration;

    @Builder
    public Token(String id, String refresh, String expiration) {
        this.id = id;
        this.refresh = refresh;
        this.expiration = expiration;
    }
}

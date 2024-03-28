package com.olbl.stickeywaiting.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaitStateRes {

    @JsonProperty("myTurn")
    private boolean myTurn;

    @JsonProperty("key")
    private String key;

    @JsonProperty("rank")
    private int rank;

    public WaitStateRes() {

    }

    @Builder
    public WaitStateRes(boolean myTurn, int rank, String key) {
        this.myTurn = myTurn;
        this.rank = rank;
        this.key = key;
    }
}

package com.olbl.stickeywaiting.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaitRes {

    @JsonProperty("rank")
    private Long rank;

    public WaitRes() {

    }

    @Builder
    public WaitRes(Long rank) {
        this.rank = rank;
    }
}

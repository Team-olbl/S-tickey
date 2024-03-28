package com.olbl.stickeywaiting.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelRes {

    @JsonProperty("isSuccess")
    private boolean isSuccess;

    public CancelRes() {

    }

    @Builder
    public CancelRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}

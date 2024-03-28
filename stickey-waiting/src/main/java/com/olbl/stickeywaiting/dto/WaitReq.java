package com.olbl.stickeywaiting.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WaitReq {

    @JsonProperty("id")
    private int id;

    @JsonProperty("gameId")
    private int gameId;
}

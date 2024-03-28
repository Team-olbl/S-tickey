package com.olbl.stickeymain.domain.admin.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WaitingSupportListRes {

    private List<WaitingSupportRes> waitingSupportRes;
    private long count;

}

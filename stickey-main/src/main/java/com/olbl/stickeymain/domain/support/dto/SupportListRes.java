package com.olbl.stickeymain.domain.support.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SupportListRes {

    private List<SupportRes> supportResList;
    private long count;
}

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
    
    // TODO: 무한스크롤 구현 예정.
}

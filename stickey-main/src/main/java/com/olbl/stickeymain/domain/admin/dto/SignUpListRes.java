package com.olbl.stickeymain.domain.admin.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignUpListRes {

    private List<SignUpRes> signUpResList;
    private long count;
}

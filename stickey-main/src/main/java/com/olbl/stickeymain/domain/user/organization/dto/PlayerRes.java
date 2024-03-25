package com.olbl.stickeymain.domain.user.organization.dto;

import java.time.LocalDate;

public interface PlayerRes {

    int getId(); //선수 식별ID

    String getName(); //선수명

    String getProfile(); //선수 프로필 이미지

    String getDescription(); //설명

    String getCategory(); //종목

    LocalDate getBirth(); //생년월일

}

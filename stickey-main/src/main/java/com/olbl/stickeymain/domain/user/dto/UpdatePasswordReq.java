package com.olbl.stickeymain.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpdatePasswordReq {

    @NotBlank
    private String password;

}

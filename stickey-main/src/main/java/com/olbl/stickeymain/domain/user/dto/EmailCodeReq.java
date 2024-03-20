package com.olbl.stickeymain.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailCodeReq {

    @Email
    @NotBlank
    private String email;

}

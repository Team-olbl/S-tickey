package com.olbl.stickeymain.domain.admin.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmReq {

    @Pattern(regexp = "1|2")
    private String status;

}

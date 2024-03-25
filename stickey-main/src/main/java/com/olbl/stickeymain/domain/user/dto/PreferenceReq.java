package com.olbl.stickeymain.domain.user.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PreferenceReq {

    List<Integer> preferences;
}

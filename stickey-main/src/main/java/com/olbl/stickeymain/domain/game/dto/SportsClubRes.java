package com.olbl.stickeymain.domain.game.dto;

import com.olbl.stickeymain.domain.game.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SportsClubRes {

    private int id;
    private String name;
    private String logo;
    private Category category;
    private int isPrefer; //선호구단 여부

}

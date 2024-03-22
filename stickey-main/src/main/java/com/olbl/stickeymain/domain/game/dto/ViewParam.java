package com.olbl.stickeymain.domain.game.dto;

import com.olbl.stickeymain.domain.game.entity.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "목록 조회 조건 파라미터")
public class ViewParam {

    private Category catg; //종목
    private List<String> club; //구단
    @Pattern(regexp = "^\\d{4}(0[1-9]|1[0-2])$", message = "날짜는 YYYYMM 형식이어야 합니다.")
    private String date; // YYYYMM 형식

    public LocalDateTime getDateAsLocalDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");
        YearMonth ym = YearMonth.parse(this.date, formatter);
        return ym.atDay(1).atStartOfDay();
    }
}

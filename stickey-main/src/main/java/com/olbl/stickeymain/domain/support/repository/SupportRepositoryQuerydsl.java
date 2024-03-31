package com.olbl.stickeymain.domain.support.repository;

import com.olbl.stickeymain.domain.support.dto.SupportListRes;
import com.olbl.stickeymain.domain.support.dto.SupportOneRes;

public interface SupportRepositoryQuerydsl {

    SupportListRes getSupportListByFlag(Integer flag);

    SupportOneRes getSupportOneById(int id);

    int getSupportByItemByTime();
}

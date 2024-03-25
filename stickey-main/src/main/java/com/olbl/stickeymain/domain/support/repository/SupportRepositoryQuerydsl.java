package com.olbl.stickeymain.domain.support.repository;

import com.olbl.stickeymain.domain.support.dto.SupportListRes;

public interface SupportRepositoryQuerydsl {

    SupportListRes getSupportListByFlag(Integer flag);
}

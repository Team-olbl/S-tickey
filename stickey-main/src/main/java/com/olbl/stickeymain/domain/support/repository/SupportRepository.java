package com.olbl.stickeymain.domain.support.repository;


import com.olbl.stickeymain.domain.admin.dto.WaitingSupportRes;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Integer>,
    SupportRepositoryQuerydsl {

    List<WaitingSupportRes> findAllByStatus(SupportStatus status);

}

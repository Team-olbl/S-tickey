package com.olbl.stickeymain.domain.support.repository;


import com.olbl.stickeymain.domain.admin.dto.WaitingSupportOneRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportRes;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Integer> {

    List<WaitingSupportRes> findAllByStatus(SupportStatus status);

    Optional<WaitingSupportOneRes> findOneById(int id);

}

package com.olbl.stickeymain.domain.support.repository;


import com.olbl.stickeymain.domain.admin.dto.WaitingSupportOneRes;
import com.olbl.stickeymain.domain.admin.dto.WaitingSupportRes;
import com.olbl.stickeymain.domain.support.entity.Support;
import com.olbl.stickeymain.domain.support.entity.SupportStatus;
import com.olbl.stickeymain.domain.user.dto.MySupportOneRes;
import com.olbl.stickeymain.domain.user.dto.MySupportRes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Integer>,
    SupportRepositoryQuerydsl {

    List<WaitingSupportRes> findAllByStatus(SupportStatus status);

    Optional<WaitingSupportOneRes> findOneById(int id);

    Slice<MySupportRes> findAllByOrganizationId(int id, Pageable pageable);

    Optional<MySupportOneRes> findMySupportOneById(int id);
    
}

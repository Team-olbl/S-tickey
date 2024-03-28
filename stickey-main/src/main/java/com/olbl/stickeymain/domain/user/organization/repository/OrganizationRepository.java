package com.olbl.stickeymain.domain.user.organization.repository;

import com.olbl.stickeymain.domain.admin.dto.SignUpRes;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoRes;
import com.olbl.stickeymain.domain.user.organization.entity.Organization;
import com.olbl.stickeymain.domain.user.organization.entity.OrganizationStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

    List<SignUpRes> findAllByStatus(OrganizationStatus status);

    Optional<Organization> findById(int id);
    
    Optional<OrganizationInfoRes> findOrganizationInfoById(int id);

}

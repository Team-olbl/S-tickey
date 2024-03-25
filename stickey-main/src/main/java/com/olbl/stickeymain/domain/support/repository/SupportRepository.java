package com.olbl.stickeymain.domain.support.repository;

import com.olbl.stickeymain.domain.support.entity.Support;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Integer> {

}

package com.olbl.stickeymain.domain.notify.repository;

import com.olbl.stickeymain.domain.notify.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotifyRepository extends JpaRepository<Notify, Long> {

}

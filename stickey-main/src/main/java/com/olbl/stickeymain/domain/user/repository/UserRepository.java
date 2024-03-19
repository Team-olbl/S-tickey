package com.olbl.stickeymain.domain.user.repository;

import com.olbl.stickeymain.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}

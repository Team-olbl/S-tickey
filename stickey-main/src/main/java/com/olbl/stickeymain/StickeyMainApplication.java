package com.olbl.stickeymain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StickeyMainApplication {

    public static void main(String[] args) {
        SpringApplication.run(StickeyMainApplication.class, args);
    }

}

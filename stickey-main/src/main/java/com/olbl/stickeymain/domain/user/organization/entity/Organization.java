package com.olbl.stickeymain.domain.user.organization.entity;

import com.olbl.stickeymain.domain.user.entity.User;
import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoReq;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("Organization")
@Setter
@SuperBuilder
public class Organization extends User {

    private String manager;
    private String address;
    private String registrationNumber;
    private String registrationFile;
    @Enumerated(EnumType.STRING)
    private OrganizationStatus status;
    private String message;

    @OneToMany(mappedBy = "organization")
    private List<Player> players = new ArrayList<>();

    public void updateInfo(OrganizationInfoReq dto) {
        this.manager = dto.getManager().isEmpty() ? this.manager : dto.getManager();
        this.address = dto.getName().isEmpty() ? this.address : dto.getAddress();
        this.registrationNumber =
            dto.getName().isEmpty() ? this.registrationNumber : dto.getRegistrationNumber();
        this.message = null;
    }
}

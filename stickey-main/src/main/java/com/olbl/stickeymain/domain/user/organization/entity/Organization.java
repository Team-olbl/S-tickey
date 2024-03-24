package com.olbl.stickeymain.domain.user.organization.entity;

import com.olbl.stickeymain.domain.user.entity.User;
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

    @OneToMany(mappedBy = "organization")
    private List<Player> players = new ArrayList<>();

}

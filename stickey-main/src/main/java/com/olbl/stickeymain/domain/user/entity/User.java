package com.olbl.stickeymain.domain.user.entity;

import com.olbl.stickeymain.domain.user.organization.dto.OrganizationInfoReq;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
@Inheritance(strategy = InheritanceType.JOINED)
@SuperBuilder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String account;
    private String profileImage;
    @CreatedDate
    private LocalDateTime createTime;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Preference> preference = new ArrayList<>();

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }

    // 기존 Preference 리스트를 새로운 리스트로 교체하는 메소드
    public void changePreferences(List<Preference> newPreferences) {
        this.preference.clear(); // 기존 Preference 객체들을 모두 삭제
        for (Preference pref : newPreferences) { // 새로운 Preference 객체들을 추가
            this.addPreference(pref);
        }
    }

    // Preference 객체를 User와 연결하고 리스트에 추가하는 메소드
    public void addPreference(Preference preference) {
        this.preference.add(preference);
        preference.setUser(this);
    }

    public void updateUserInfo(OrganizationInfoReq dto) {
        this.name = dto.getName().isEmpty() ? this.name : dto.getName();
        this.email = dto.getEmail().isEmpty() ? this.email : dto.getEmail();
        this.phone = dto.getPhone().isEmpty() ? this.phone : dto.getPhone();
    }

    public void updateProfileImage(String profileUrl) {
        this.profileImage = profileUrl;
    }

    public void updatePhone(String phone) {
        this.phone = phone.isEmpty() ? this.phone : phone;
    }
}

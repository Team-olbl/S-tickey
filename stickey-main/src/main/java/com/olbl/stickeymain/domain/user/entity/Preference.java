package com.olbl.stickeymain.domain.user.entity;

import com.olbl.stickeymain.domain.game.entity.SportsClub;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sports_club_id")
    private SportsClub sportsClub;

    @Builder
    public Preference(User user, SportsClub sportsClub) {
        this.user = user;
        this.sportsClub = sportsClub;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

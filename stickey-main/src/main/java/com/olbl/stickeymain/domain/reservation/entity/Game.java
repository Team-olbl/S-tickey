package com.olbl.stickeymain.domain.reservation.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stadium_id")
    private Stadium stadium;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_team_id")
    private SportsClub homeTeam;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "away_team_id")
    private SportsClub awayTeam;
    @Enumerated(EnumType.STRING)
    private Category category;
    private LocalDateTime bookStartTime;
    private LocalDateTime bookEndTime;
    private LocalDateTime gameStartTime;

    @Builder
    public Game(Stadium stadium, SportsClub homeTeam, SportsClub awayTeam, Category category,
        LocalDateTime bookStartTime, LocalDateTime bookEndTime, LocalDateTime gameStartTime) {
        this.stadium = stadium;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.category = category;
        this.bookStartTime = bookStartTime;
        this.bookEndTime = bookEndTime;
        this.gameStartTime = gameStartTime;
    }
}

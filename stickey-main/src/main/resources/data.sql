use STICKEY;

INSERT INTO sports_club(name, category) values ("FC서울", "SOCCER");
INSERT INTO sports_club(name, category) values ("대구FC", "SOCCER");
INSERT INTO sports_club(name, category) values ("전북FC", "SOCCER");

INSERT INTO stadium(name, region) values ("DGB대구은행파크", "대구");

INSERT INTO game(away_team_id, home_team_id, stadium_id, book_start_time, book_end_time, game_start_time, category)
values (1, 2, 1, '2024-03-19T01:42:48', '2024-03-23T01:42:48', '2024-03-21T01:42:48', 'SOCCER');
INSERT INTO game(away_team_id, home_team_id, stadium_id, book_start_time, book_end_time, game_start_time, category)
values (2, 3, 1, '2024-03-19T01:42:48', '2024-03-23T01:42:48', '2024-03-21T01:42:48', 'SOCCER');
INSERT INTO game(away_team_id, home_team_id, stadium_id, book_start_time, book_end_time, game_start_time, category)
values (1, 3, 1, '2024-03-19T01:42:48', '2024-03-23T01:42:48', '2024-03-21T01:42:48', 'SOCCER');
INSERT INTO game(away_team_id, home_team_id, stadium_id, book_start_time, book_end_time, game_start_time, category)
values (1, 3, 1, '2024-03-15T01:42:48', '2024-03-23T01:42:48', '2024-03-21T01:42:48', 'SOCCER');
INSERT INTO game(away_team_id, home_team_id, stadium_id, book_start_time, book_end_time, game_start_time, category)
values (1, 3, 1, '2024-03-16T01:42:48', '2024-03-24T01:42:48', '2024-03-21T01:42:48', 'SOCCER');

insert into stadium_zone(price, stadium_id, name) values(10000, 1, 'E');
insert into stadium_zone(price, stadium_id, name) values(15000, 1, 'W');
insert into stadium_zone(price, stadium_id, name) values(20000, 1, 'R');
insert into stadium_zone(price, stadium_id, name) values(30000, 1, 'S');


insert into stadium_seat(zone_id, seat_id) values(1, 1);
insert into stadium_seat(zone_id, seat_id) values(1, 2);
insert into stadium_seat(zone_id, seat_id) values(1, 3);
insert into stadium_seat(zone_id, seat_id) values(1, 4);
insert into stadium_seat(zone_id, seat_id) values(1, 5);
insert into stadium_seat(zone_id, seat_id) values(1, 6);

insert into stadium_seat(zone_id, seat_id) values(2, 1);
insert into stadium_seat(zone_id, seat_id) values(2, 2);
insert into stadium_seat(zone_id, seat_id) values(2, 3);
insert into stadium_seat(zone_id, seat_id) values(2, 4);
insert into stadium_seat(zone_id, seat_id) values(2, 5);
insert into stadium_seat(zone_id, seat_id) values(2, 6);

insert into stadium_seat(zone_id, seat_id) values(3, 1);
insert into stadium_seat(zone_id, seat_id) values(3, 2);
insert into stadium_seat(zone_id, seat_id) values(3, 3);
insert into stadium_seat(zone_id, seat_id) values(3, 4);
insert into stadium_seat(zone_id, seat_id) values(3, 5);
insert into stadium_seat(zone_id, seat_id) values(3, 6);

insert into stadium_seat(zone_id, seat_id) values(4, 1);
insert into stadium_seat(zone_id, seat_id) values(4, 2);
insert into stadium_seat(zone_id, seat_id) values(4, 3);
insert into stadium_seat(zone_id, seat_id) values(4, 4);
insert into stadium_seat(zone_id, seat_id) values(4, 5);
insert into stadium_seat(zone_id, seat_id) values(4, 6);

insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 1, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 2, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 3, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 4, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 5, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'E', 1, 10000, 6, 'NOTSOLD');

insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 1, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 2, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 3, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 4, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 5, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'W', 2, 15000, 6, 'NOTSOLD');

insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 1, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 2, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 3, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 4, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 5, 'NOTSOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'R', 3, 20000, 6, 'NOTSOLD');

insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 1, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 2, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 3, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 4, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 5, 'SOLD');
insert into game_seat(game_id, zone_name, zone_id, price, seat_number, status)
values(1, 'S', 4, 30000, 6, 'SOLD');

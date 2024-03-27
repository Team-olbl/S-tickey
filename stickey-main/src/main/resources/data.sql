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

INSERT INTO `user` (`create_time`, `account`, `email`, `name`, `password`, `phone`, `profile_image`, `role`)
VALUES
    ('2024-03-27 12:00:00', 'user01', 'user01@example.com', 'Jane Doe', 'password123', '010-1234-5678', 'path/to/image1.jpg', 'ORGANIZATION'),
    ('2024-03-27 12:10:00', 'user02', 'user02@example.com', 'John Smith', 'password123', '010-2345-6789', 'path/to/image2.jpg', 'ORGANIZATION'),
    ('2024-03-27 12:20:00', 'user03', 'user03@example.com', 'Alice Johnson', 'password123', '010-3456-7890', 'path/to/image3.jpg', 'ORGANIZATION'),
    ('2024-03-27 12:30:00', 'user04', 'user04@example.com', 'Bob Brown', 'password123', '010-4567-8901', 'path/to/image4.jpg', 'INDIVIDUAL'),
    ('2024-03-27 12:40:00', 'user05', 'user05@example.com', 'Carol King', 'password123', '010-5678-9012', 'path/to/image5.jpg', 'INDIVIDUAL'),
    ('2024-03-27 12:50:00', 'user06', 'user06@example.com', 'David Wilson', 'password123', '010-6789-0123', 'path/to/image6.jpg', 'ADMIN');

INSERT INTO `organization` (`id`, `address`, `manager`, `message`, `registration_file`, `registration_number`, `status`)
VALUES
    (1, '1234 Maple Street, Example City', 'Jane Doe', 'We strive for excellence.', 'path/to/registration1.pdf', 'REG-12345', 'ACCEPTED'),
    (2, '5678 Oak Avenue, Sample Town', 'John Smith', 'Committed to community service.', 'path/to/registration2.pdf', 'REG-23456', 'ACCEPTED'),
    (3, '91011 Birch Lane, Demo Ville', 'Alice Johnson', 'Innovation through collaboration.', 'path/to/registration3.pdf', 'REG-34567', 'ACCEPTED');

INSERT INTO `player` (`birth`, `organization_id`, `category`, `description`, `name`, `profile`)
VALUES
    ('1995-04-15', 1, '축구', '국가대표 공격수로 유럽 리그에서 활약 중', '김민재', 'http://example.com/profiles/kimminjae'),
    ('1988-07-23', 2, '야구', '메이저 리그에서 투수로 활약하는 베테랑', '박병호', 'http://example.com/profiles/parkbyungho'),
    ('2000-03-09', 1, '농구', 'NBA에서 활약하는 슈팅 가드', '정성우', 'http://example.com/profiles/jungsungwoo'),
    ('1992-11-30', 3, '축구', '프리미어 리그의 미드필더로 활약 중', '이강인', 'http://example.com/profiles/leekangin'),
    ('1994-05-20', 2, '야구', 'KBO 리그의 홈런왕', '최정', 'http://example.com/profiles/choijung'),
    ('1999-02-18', 1, '농구', '유럽 리그에서 뛰는 유망한 포워드', '김주성', 'http://example.com/profiles/kimjoosung'),
    ('1993-08-12', 3, '축구', '국내 리그에서 최고의 수비수로 꼽힘', '홍정호', 'http://example.com/profiles/hongjungho'),
    ('1996-04-27', 2, '야구', '일본 리그에서 활약하는 선발 투수', '양현종', 'http://example.com/profiles/yanghyeonjong'),
    ('1990-09-15', 1, '농구', '대학 리그에서 신기록을 세운 센터', '하승진', 'http://example.com/profiles/haseungjin'),
    ('2001-06-22', 3, '축구', '젊은 윙어로 빠른 속도와 기술로 유명', '손흥민', 'http://example.com/profiles/sonheungmin');

INSERT INTO `support` (`id`, `organization_id`, `create_time`, `end_time`, `start_time`, `content`, `message`, `support_image`, `title`, `status`)
VALUES
    ('1', '1', '2024-03-27 08:00:00', '2024-04-01 18:00:00', '2024-03-27 08:00:00', 'The application crashes on launch.', 'The app crashes every time I try to open it since the last update.', 'crash_report_1.png', 'App Crash on Launch', 'ACCEPTED'),
    ('2', '2', '2024-03-27 09:30:00', '2024-04-02 17:30:00', '2024-03-27 09:30:00', 'Unable to sync data across devices.', 'I am having trouble syncing my data between my phone and tablet.', 'sync_issue.png', 'Syncing Issue', 'ACCEPTED'),
    ('3', '1', '2024-03-27 10:45:00', '2024-04-03 16:45:00', '2024-03-27 10:45:00', 'Feature request: dark mode.', 'It would be great if there was a dark mode available in the app.', 'feature_request_dark_mode.png', 'Feature Request: Dark Mode', 'WAITING'),
    ('4', '3', '2024-03-27 11:00:00', '2024-04-04 15:00:00', '2024-03-27 11:00:00', 'Billing issue: overcharged this month.', 'I was overcharged on my last bill compared to my usual monthly fee.', 'billing_issue.png', 'Billing Issue', 'ACCEPTED'),
    ('5', '1', '2024-03-27 12:15:00', '2024-04-05 14:15:00', '2024-03-27 12:15:00', 'Login problem: forgot password not working.', 'I tried the "forgot password" option, but I never received an email to reset it.', 'login_problem.png', 'Login Problem', 'REJECTED'),
    ('6', '3', '2024-03-27 13:30:00', '2024-04-06 13:30:00', '2024-03-27 13:30:00', 'Account locked out unexpectedly.', 'My account was locked out without any warning, and I can log in.', 'account_locked.png', 'Account Locked', 'ACCEPTED'),
    ('7', '2', '2024-03-27 14:45:00', '2024-04-07 12:45:00', '2024-03-27 14:45:00', 'Update installation failed.', 'The latest update fails to install every time I try.', 'update_failed.png', 'Update Installation Failed', 'ACCEPTED');
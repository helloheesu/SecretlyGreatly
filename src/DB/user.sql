USE movies;

CREATE TABLE user (
	UID INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	username VARCHAR(50) 
);
GRANT select, insert
	ON movies.user TO 'guest_demo'@'%';

CREATE TABLE movie(
	mID INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	year INT,
	poster_url VARCHAR(2000)
);
GRANT select, insert
	ON movies.user TO 'guest_demo'@'%';
# 사실 guest_demo 로 하면 안 됨. 다른 유저를 생성해야ㅜㅜ
# 유저 이름도 guest_demo 말고 다른 걸로 바꿔야ㅜㅜ
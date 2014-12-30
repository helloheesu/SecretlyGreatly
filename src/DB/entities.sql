USE movies;

CREATE TABLE user (
	UID INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL UNIQUE,
	password BINARY(16) NOT NULL,
	username VARCHAR(50) 
);
GRANT select, insert
	ON movies.user TO 'guest_demo'@'%';
INSERT INTO user (email, password, username) VALUES(email, UNHEX(SHA1(password)), username);
SELECT username WHERE email=email AND password=UNHEX(SHA1(password));

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

CREATE TABLE genre(
	mID INT NOT NULL,
	genre VARCHAR(255) NOT NULL,
	FOREIGN KEY (mID) REFERENCES movie (mID) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (mID, genre)
);
GRANT select, insert
	ON movies.genre TO 'guest_demo'@'%';


CREATE TABLE crew(
	cID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	profile_url VARCHAR(2000)
);
# node.js 에서 넣을 때 profile_url의 경우 null 이면 default 를 넣도록 / js에서 null이면 default 에 해당하는 이미지를 뿌려야..?
# 후자 선택. 게다가 크롤링시에 처음엔 cID만 넣고, 그 뒤에 배우상세 페이지에서 프로필 사진을 얻어 보완하는 방식으로 해야함.
GRANT select, insert
	ON movies.crew TO 'guest_demo'@'%';
USE movies;

CREATE TABLE user (
	UID INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL UNIQUE,
	password BINARY(20) NOT NULL,	-- LENGTH(SHA1('something')) == 20
	username VARCHAR(50) 
);
GRANT select, insert
	ON movies.user TO 'guest_demo'@'%';
INSERT INTO user (email, password, username) VALUES('heesu@nhnnext.org', UNHEX(SHA1('saveNext')), 'helloheesu');
SELECT username FROM user WHERE email='heesu@nhnnext.org' AND password=UNHEX(SHA1('saveNext'));

CREATE TABLE movie(
	mID INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	year INT,
	poster_url VARCHAR(2000)
);
GRANT select, insert
	ON movies.user TO 'guest_demo'@'%';
-- 사실 guest_demo 로 하면 안 됨. 다른 유저를 생성해야ㅜㅜ
-- 유저 이름도 guest_demo 말고 다른 걸로 바꿔야ㅜㅜ
INSERT INTO movie(mID, title, year, poster_url) VALUES(472160, 'Penelope', 2008, 'http://ia.media-imdb.com/images/M/MV5BMTc0MTYwNzQ5Nl5BMl5BanBnXkFtZTcwMjg2MzU1MQ@@._V1_SY317_CR2,0,214,317_AL_.jpg');

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
-- node.js 에서 넣을 때 profile_url의 경우 null 이면 default 를 넣도록 / js에서 null이면 default 에 해당하는 이미지를 뿌려야..?
-- 후자 선택. 게다가 크롤링시에 처음엔 cID만 넣고, 그 뒤에 배우상세 페이지에서 프로필 사진을 얻어 보완하는 방식으로 해야함.
GRANT select, insert
	ON movies.crew TO 'guest_demo'@'%';
INSERT INTO crew (cID, name, profile_url) VALUES(564215, 'James McAvoy', 'http://ia.media-imdb.com/images/M/MV5BMTQzNzIxOTYzMl5BMl5BanBnXkFtZTcwNjYxNTk1Nw@@._V1_SY317_CR14,0,214,317_AL_.jpg');
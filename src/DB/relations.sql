USE movies;

-- RENAME TABLE p_type TO type;
-- ALTER TABLE type CHANGE COLUMN typeID tID INT;
-- ALTER TABLE type CHANGE COLUMN type_name name VARCHAR(255);
CREATE TABLE type(
	tID INT PRIMARY KEY, -- 일부러 AUTO_INCREMENT 안 함.
	name VARCHAR(255) NOT NULL
);
GRANT select
	ON movies.type TO 'guest_demo'@'%';
INSERT INTO type VALUES(1, 'direction');
INSERT INTO type VALUES(2, 'scenario');
INSERT INTO type VALUES(3, 'acting');
INSERT INTO type VALUES(4, 'music');
INSERT INTO type VALUES(5, 'cinematography');

CREATE TABLE participate(
	mID INT NOT NULL,
	cID INT NOT NULL,
	tID INT NOT NULL,
	role VARCHAR(255),
	credit_order INT NOT NULL,
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (cID) REFERENCES crew(cID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tID) REFERENCES type(tID) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (mID, cID, tID)
);
GRANT select, insert
	ON movies.participate TO 'guest_demo'@'%';
INSERT INTO participate (mID, cID, tID, role, credit_order) VALUES(472160, 564215, 3, 'Johnny / Max', 15);

CREATE TABLE total_record(
	rID INT NOT NULL AUTO_INCREMENT,
	timestamp TIMESTAMP NOT NULL,
	PRIMARY KEY (rID, timestamp),
	uID INT NOT NULL,
	mID INT NOT NULL,
	total_score DECIMAL(2, 1),
	comment TEXT,
	FOREIGN KEY (uID) REFERENCES user(uID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.total_record TO 'guest_demo'@'%';
CREATE TABLE record(
	rID INT NOT NULL AUTO_INCREMENT,
	timestamp TIMESTAMP NOT NULL,
	PRIMARY KEY (rID, timestamp),
	uID INT NOT NULL,
	mID INT NOT NULL,
	tID INT NOT NULL,
	type_score DECIMAL(2,1),
	FOREIGN KEY (uID) REFERENCES user(uID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tID) REFERENCES type(tID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (rID) REFERENCES total_record(rID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.record TO 'guest_demo'@'%';

-- CREATE
INSERT INTO total_record (uID, mID, total_score, comment) VALUES (SELECT uID FROM user WHERE username='helloheesu', 472160, 4.0, '맥어보이b');
INSERT INTO record (rID, uID, mID, tID, type_score) VALUES (SELECT LAST_INSERT_ID(), SELECT uID FROM user WHERE username='helloheesu', 472160, 3, 5.0);
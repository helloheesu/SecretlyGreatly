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

CREATE TABLE total_eval(
	total_eID INT PRIMARY KEY AUTO_INCREMENT,
	mID INT NOT NULL,
	score DECIMAL(2, 1),
	comment TEXT,
	timestamp TIMESTAMP NOT NULL,
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.total_eval TO 'guest_demo'@'%';
CREATE TABLE type_eval(
	type_eID INT PRIMARY KEY AUTO_INCREMENT,
	mID INT NOT NULL,
	tID INT NOT NULL,
	score DECIMAL(2,1),
	timestamp TIMESTAMP NOT NULL,
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (tID) REFERENCES type(tID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.type_eval TO 'guest_demo'@'%';
CREATE TABLE record(
	rID INT PRIMARY KEY AUTO_INCREMENT,
	uID INT NOT NULL,
	total_eID  INT NOT NULL,
	type_eID INT NOT NULL,
	FOREIGN KEY (uID) REFERENCES user(uID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (total_eID) REFERENCES total_eval(total_eID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (type_eID) REFERENCES type_eval(type_eID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.record TO 'guest_demo'@'%';

-- CREATE
INSERT INTO total_eval (mID, score, comment) VALUES (472160, 4.0, '맥어보이b');
SET @toID = LAST_INSERT_ID();
INSERT INTO type_eval (mID, tID, score) VALUES (472160, 3, 5.0);
SET @tyID = LAST_INSERT_ID();
INSERT INTO record (uID, total_eID, type_eID) VALUES ((SELECT uID FROM user WHERE username='helloheesu'), @toID, @tyID);
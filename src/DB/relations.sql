CREATE TABLE p_type(
	typeID INT PRIMARY KEY,
	type_name VARCHAR(255) NOT NULL
);
GRANT select
	ON movies.p_type TO 'guest_demo'@'%';
INSERT INTO p_type VALUES(1, 'direction');
INSERT INTO p_type VALUES(2, 'scenario');
INSERT INTO p_type VALUES(3, 'acting');
INSERT INTO p_type VALUES(4, 'music');
INSERT INTO p_type VALUES(5, 'cinematography');

CREATE TABLE participation(
	pID INT PRIMARY KEY AUTO_INCREMENT,
	mID INT NOT NULL,
	cID INT NOT NULL,
	typeID INT NOT NULL,
	rank INT NOT NULL,
	role VARCHAR(255),
	FOREIGN KEY (mID) REFERENCES movie(mID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (cID) REFERENCES crew(cID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (typeID) REFERENCES p_type(typeID) ON UPDATE CASCADE ON DELETE CASCADE
);
GRANT select, insert
	ON movies.participation TO 'guest_demo'@'%';
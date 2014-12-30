CREATE TABLE type(
	tID INT PRIMARY KEY,
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
	ON movies.participation TO 'guest_demo'@'%';
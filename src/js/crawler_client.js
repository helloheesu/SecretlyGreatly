var mysql = require('mysql');

var movieCrawler = require('./imdb-crawler.js').movieCrawler;
var participationCrawler = require('./imdb-crawler.js').participationCrawler;
var crewCrawler = require('./imdb-crawler.js').crewCrawler;

var pool  = mysql.createPool({
	connectionLimit : 20,
	user: 'guest_demo',
	database: 'movies'
});

var startIdx = 1798630;
var endIdx = 1798660;
/*
var movieInsertSql = 'INSERT INTO movie (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
var genreInsertSql = 'INSERT INTO genre (mID, genre) VALUES(?, ?);';

for (var i = startIdx; i < endIdx; i++) {
	(function(i) {
		var c = new movieCrawler(i);
		c.requestMovieInfo.call(c, function () {
			c.parseData.call(c);
			pool.getConnection(function(err, sqlConn) {
				sqlConn.query(movieInsertSql, [c.movieID, c.movieData.title, c.movieData.year, c.movieData.poster], function (err, result) {
					if(err) {
						if(err.code == 'ER_DUP_ENTRY') {
							console.log('movie#'+c.movieID+' already exists');
						} else { throw err; }
					} else { console.log(c.movieID+' inserted!'); }
					var insertedOK = 0; // !!!!!!!! 이거 클로져 불안하다.
					for (var i = 0; i < c.movieData.genre.length; i++) {
						sqlConn.query(genreInsertSql, [c.movieID, c.movieData.genre[i]], function (err, result) {
							if(err) {
								if(err.code == 'ER_DUP_ENTRY') {
									console.log('movie#'+c.movieID+' already exists');
								} else { throw err; }
							} else { console.log('movie#'+c.movieID+' genre#'+i+' inserted!'); }
							console.log('inserted genre: '+(++insertedOK));
							if(insertedOK >= c.movieData.genre.length) {
								console.info('will release sqlConn');
								sqlConn.release();
							}
						});
					}
				});
			});
		});
	})(i);
}
*/

var reqNInsertCrew = function(crewID, callback) {
	var crewInsertSql = 'INSERT INTO crew (cID, name, profile_url) VALUES(?, ?, ?);';
	var cc = new crewCrawler(crewID);
	cc.requestCrewInfo.call(cc, function () {
		cc.parseData.call(cc);
		console.log(cc.crewData);
		pool.getConnection(function(err, sqlConn) {
			sqlConn.query(crewInsertSql, [cc.crewID, cc.crewData.name, cc.crewData.profile], function (err, result) {
				if(err) {
					if(err.code == 'ER_DUP_ENTRY') {
						console.log('crew#'+cc.crewID+' already exists');
					} else { throw err; }
				} else { console.log(cc.crewID+' inserted!'); }
				callback();
				sqlConn.release();
			});
		});
	});
};

var crewReqQueue = [];

for (var i = startIdx; i < endIdx; i++) {
	(function funcA(i) {
		var pc = new participationCrawler(i);
		var pInsertSql = 'INSERT INTO participate (mID, cID, tID, role, credit_order) VALUES(?, ?, ?, ?, ?)';
		pc.requestParticipationInfo.call(pc, function () {
			pc.parseData.call(pc);
			var pData = pc.participationData;
			for (var type in pData) {
				var typeID;
				switch(type) {
					case 'direction': typeID = 1; break;
					case 'scenario': typeID = 2; break;
					case 'acting': typeID = 3; break;
					case 'music': typeID = 4; break;
					case 'cinematography': typeID = 5; break;
				}
				(function(newM, newT) {
					var typeCrewArray = pData[type];    // array of {cID:cID, role:role, creditOrder:creditOrder}
					for (var i = 0; i < typeCrewArray.length; i++) {
						(function(i) {
							var newC = typeCrewArray[i].cID, newR = typeCrewArray[i].role, newO = typeCrewArray[i].creditOrder;
							var newArr = [ newM, newC, newT, newR, newO ];
							// console.log(newArr);
							pool.getConnection(function(err, sqlConn) {
								sqlConn.query(pInsertSql, newArr, function (err, result) {
									if(err) {
										if(err.code == 'ER_DUP_ENTRY') {
											console.log('movie#'+newM+' crew#'+newC+' type#'+newT+' already exists!');
										} else if(err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW_') {
											// crewReqQueue.push(newC);
											reqNInsertCrew(newC, function(){funcA(i);});
										} else { console.error(err); }
									} else { console.log('movie#'+newM+' crew#'+newC+' type#'+newT+' inserted!'); }
									// console.info('will release sqlConn');
									sqlConn.release();
								});
							});
						})(i);
					}
				})(pc.movieID, typeID);
			}
		});
	})(i);
}
console.log(crewReqQueue);

/*
var crewInsertSql = 'INSERT INTO crew (cID, name, profile_url) VALUES(?, ?, ?);';
var crewID = 115;
var cc = new crewCrawler(crewID);
cc.requestCrewInfo.call(cc, function () {
	cc.parseData.call(cc);
	console.log(cc.crewData);
	pool.getConnection(function(err, sqlConn) {
		sqlConn.query(crewInsertSql, [cc.crewID, cc.crewData.name, cc.crewData.profile], function (err, result) {
			if(err) {
				if(err.code == 'ER_DUP_ENTRY') {
					console.log('crew#'+cc.crewID+' already exists');
				} else { throw err; }
			} else { console.log(cc.crewID+' inserted!'); }
			sqlConn.release();
		});
	});
});
*/
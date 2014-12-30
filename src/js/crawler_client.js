var mysql = require('mysql');

var movieCrawler = require('./imdb-crawler.js').movieCrawler;
var participationCrawler = require('./imdb-crawler.js').participationCrawler;
var crewCrawler = require('./imdb-crawler.js').crewCrawler;

var pool  = mysql.createPool({
	connectionLimit : 20,
	user: 'guest_demo',
	database: 'movies'
});

var movieInsertSql = 'INSERT INTO movie (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
var genreInsertSql = 'INSERT INTO genre (mID, genre) VALUES(?, ?);';

for (var i = 1; i < 110; i++) {
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
					var insertedOK = 0;
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


/*
var movieID = 268126;
var pc = new participationCrawler(movieID);
var pInsertSql = 'INSERT INTO participate (mID, cID, tID, role, credit_order) VALUES(?, ?, ?, ?, ?)';
pc.requestParticipationInfo.call(pc, function () {
	pc.parseData.call(pc);
	pool.getConnection(function(err, sqlConn) {
		var insertedOK = 0;
		var pData = pc.participationData;
		for (var type in pData) {
			(function(type) {
				var typeID;
				switch(type) {
					case 'direction': typeID = 1; break;
					case 'scenario': typeID = 2; break;
					case 'acting': typeID = 3; break;
					case 'music': typeID = 4; break;
					case 'cinematography': typeID = 5; break;
				}
				// array of {cID:cID, role:role, creditOrder:creditOrder}
				var typeCrewArray = pData[type];
				for (var i = 0; i < typeCrewArray.length; i++) {
					(function(i) {
						var newM = pc.movieID, newC = typeCrewArray[i].cID, newT = typeID, newR = typeCrewArray[i].role, newO = typeCrewArray[i].creditOrder;
						var newObj = { m:newM, c:newC, t:newT, r:newR, o:newO };
						console.log(newObj);
					})(i);
				}
			})(type);
		}
		// for (var i = 0; i < pc.participationData.length; i++) {
		// 	sqlConn.query(genreInsertSql, [c.movieID, c.movieData.genre[i]], function (err, result) {
		// 		if(err) {
		// 			if(err.code == 'ER_DUP_ENTRY') {
		// 				console.log('movie#'+c.movieID+' genre#'+i+' already exists');
		// 				return;
		// 			}
		// 			throw err;
		// 		} else {
		// 			console.log('movie#'+c.movieID+' genre#'+i+' inserted!');
		// 			console.log('inserted genre: '+(++insertedOK));
		// 			if(insertedOK >= c.movieData.genre.length) {
		// 				console.info('will release sqlConn');
		// 				sqlConn.release();
		// 			}
		// 		}
		// 	});
		// }
	});
	// console.log(pc.participationData);
});

var crewID = 115;
var cc = new crewCrawler(crewID);
cc.requestCrewInfo.call(cc, function () {
	cc.parseData.call(cc);
	console.log(cc.crewData);
});
*/
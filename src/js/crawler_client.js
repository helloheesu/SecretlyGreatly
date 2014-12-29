var mysql = require('mysql');

var movieCrawler = require('./imdb-crawler.js').movieCrawler;

// var sqlConn = mysql.createConnection({
var pool  = mysql.createPool({
	connectionLimit : 10,
	user: 'guest_demo',
	database: 'movies'
});

for (var i = 1; i < 10000; i++) {
	(function (i) {
		var c = new movieCrawler(i);
		c.requestMovieInfo.call(c, function () {
			c.parseData.call(c);
			var movieInsertSql = 'INSERT INTO movie (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
			pool.getConnection(function(err, sqlConn) {
				sqlConn.query(movieInsertSql, [c.movieID, c.movieData.title, c.movieData.year, c.movieData.poster], function (err, result) {
					console.info('will release sqlConn');
					sqlConn.release();
					if(err) {
						if(err.code == 'ER_DUP_ENTRY') {
							console.log('movie#'+c.movieID+' already exists');
							return;
						}
						throw err;
					} else {
						// if (result) console.log('result:'+result);
						console.log(c.movieID+' inserted!');
					}
				});
			});
			var genreInsertSql = 'INSERT INTO genre (mID, genre) VALUES(?, ?);';
			pool.getConnection(function(err, sqlConn) {
				var insertedOK = 0;
				for (var i = 0; i < c.movieData.genre.length; i++) {
					sqlConn.query(genreInsertSql, [c.movieID, c.movieData.genre[i]], function (err, result) {
						if(err) {
							if(err.code == 'ER_DUP_ENTRY') {
								console.log('movie#'+c.movieID+' genre#'+i+' already exists');
								return;
							}
							throw err;
						} else {
							console.log('movie#'+c.movieID+' genre#'+i+' inserted!');
							console.log('inserted genre: '+(++insertedOK));
							if(insertedOK >= c.movieData.genre.length) {
								console.info('will release sqlConn');
								sqlConn.release();
							}
						}
					});
				}
			});
		});
	})(i);
}

/*
var movieID = 23;
var c = new movieCrawler(movieID);
c.requestMovieInfo.call(c, function () {
	c.parseData.call(c);

	// console.log(c.movieData);
	// var movieInsertSql = 'INSERT INTO moviedata (mID, title, year, poster_url)'
	// 	+' VALUES('+sqlConn.escape(parseInt(c.movieID))+','+sqlConn.escape(c.movieData.title)+','+sqlConn.escape(parseInt(c.movieData.year))+','+sqlConn.escape(c.movieData.poster)+');';
	// console.log('state: \n'+movieInsertSql);

	var movieInsertSql = 'INSERT INTO moviedata (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
	sqlConn.query(movieInsertSql, [parseInt(c.movieID), c.movieData.title, parseInt(c.movieData.year), c.movieData.poster], function (err, result) {
		if(err) throw err;
		else {
			// if (result) console.log('result:'+result);
			console.log(c.movieID+' inserted!');
		}
	});
});
*/
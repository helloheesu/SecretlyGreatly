var mysql = require('mysql');

var imdb_crawler = require('./crawler.js');

var sqlConn = mysql.createConnection({
	user: 'guest_demo',
	database: 'movies'
});


for (var i = 1; i < 10; i++) {
	(function (i) {
		var c = new imdb_crawler(i);
		c.requestMovieInfo.call(c, function () {
			c.parseData.call(c);
			var statement = 'INSERT INTO movie (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
			sqlConn.query(statement, [c.movieID, c.movieData.title, c.movieData.year, c.movieData.poster], function (err, result) {
				if(err) throw err;
				else {
					// if (result) console.log('result:'+result);
					console.log(c.movieID+' inserted!');
				}
			});
		});		
	})(i);
}

/*
var movieID = 23;
var c = new imdb_crawler(movieID);
c.requestMovieInfo.call(c, function () {
	c.parseData.call(c);

	// console.log(c.movieData);
	// var statement = 'INSERT INTO moviedata (mID, title, year, poster_url)'
	// 	+' VALUES('+sqlConn.escape(parseInt(c.movieID))+','+sqlConn.escape(c.movieData.title)+','+sqlConn.escape(parseInt(c.movieData.year))+','+sqlConn.escape(c.movieData.poster)+');';
	// console.log('state: \n'+statement);

	var statement = 'INSERT INTO moviedata (mID, title, year, poster_url) VALUES(?, ?, ?, ?);';
	sqlConn.query(statement, [parseInt(c.movieID), c.movieData.title, parseInt(c.movieData.year), c.movieData.poster], function (err, result) {
		if(err) throw err;
		else {
			// if (result) console.log('result:'+result);
			console.log(c.movieID+' inserted!');
		}
	});
});
*/
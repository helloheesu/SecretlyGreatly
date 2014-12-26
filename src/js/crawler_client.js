var fs = require('fs');
var imdb_crawler = require('./crawler.js');
var c = new imdb_crawler(1);
c.requestMovieInfo.call(c, function () {
	console.log('callback called');
	fs.appendFile('result.html', c.data, 'utf8', function(err) {
		if(err) throw err;
	});
});
var fs = require('fs');
var imdb_crawler = require('./crawler.js');

for (var i = 0; i < 10; i++) {
	(function (i) {
		var c = new imdb_crawler(i);
		c.requestMovieInfo.call(c, function () {
			console.log('callback called');
			fs.appendFile('movie'+i+'.html', c.data, 'utf8', function(err) {
				if(err) throw err;
			});
		});		
	})(i);
}
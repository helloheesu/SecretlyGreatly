// Count all of the links from the Node.js build page
var jsdom = require("jsdom");
var fs = require('fs');

jsdom.env({
	url: "http://www.imdb.com/chart/top",
	scripts: ["http://code.jquery.com/jquery.js"],
	done: function (errors, window) {
		window.$('.posterColumn').each(function () {
			var result = ' -'+(window.$(this).attr('href'));
	  		fs.appendFile('movieLink.html', result, 'utf8', function(err) {
	  			if(err) throw err;
	  			console.log(result);
	  		});
		});
	}
});


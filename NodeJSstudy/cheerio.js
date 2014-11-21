var fs = require('fs');

var data = fs.readFileSync('nooo_top250.html', 'utf8');
console.log('read nooo_top250.html');
var cheerio = require('cheerio'), $ = cheerio.load(data);

var options = [];

$('.posterColumn').each(function (i, val) {
	var path = val.children[0].attribs.href;
	path = path.split('?ref_=')[0];
	// fs.appendFileSync('cheerio_movieLink.json', path+'\n', 'utf8');

	var option = {};
	option.url = 'http://www.imdb.com'+path;
	option.headers = {'Accept-Language':'en'};

	options.push(option);

	console.log(path);
});
console.log('done!');

var result = {'options':options};

fs.writeFileSync('cheerio_movieLink.json', JSON.stringify(result), 'utf8');

// {options:[{url:'',headers:{}},{...},{...},...]}
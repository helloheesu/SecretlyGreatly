var fs = require('fs');

var data = fs.readFileSync('nooo_top250.html', 'utf8');
console.log('read nooo_top250.html');
var cheerio = require('cheerio'), $ = cheerio.load(data);
$('.posterColumn').each(function (i, val) {
	var result = val.children[0].attribs.href;
	result = result.split('?ref_=')[0];
	fs.appendFileSync('cheerio_movieLink.txt', '    '+i+' '+result+'\n', 'utf8');
	console.log(result);
});
console.log('done!');
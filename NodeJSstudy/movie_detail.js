var fs = require('fs');

var data = fs.readFileSync('nooo_top250.html', 'utf8');
console.log('read nooo_top250.html');

console.log('cheerio');
var cheerio = require('cheerio'), $ = cheerio.load(data);
console.log('loaded');

var pathArray = [];
$('.posterColumn').each(function (i, val) {
  var result = val.children[0].attribs.href;
  result = result.split('?ref_=')[0];
  pathArray.push(result);
});
console.log('done!');



console.log('http require');
var http = require('http');

var options = {
  hostname: 'www.imdb.com',
  port: 80,
  path: '',
  method: 'GET',
  headers: {'Accept-Language':'en'},
  agent:false
};

options.path = pathArray[0];
console.log('sure? '+pathArray);



console.log('http request');
var req = http.request(options, function(res) {
  console.log('helloooooo');
  console.log(options);
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
  var count = 0;
  res.on('data', function(data) {
    count = count+1;
    console.log('res'+count);
    var count2 = 0;
    fs.appendFile('showshank.html', data, 'utf8', function (error) {
      count2 = count2+1;
      console.log(count+'append'+count2);
  		if (error) {console.log('fsw error : '+error);}
  	});
  });
  console.log('is there data?');
});
req.end();
console.log('req end');
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
console.log('on error');

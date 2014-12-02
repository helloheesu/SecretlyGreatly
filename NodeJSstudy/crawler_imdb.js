var http = require('http');
var fs = require('fs');

var options = {
  hostname: 'www.imdb.com',
  port: 80,
  path: '/chart/top',
  method: 'GET',
  headers: {'Accept-Language':'en'},  // 영화이름이 'Daeboo' 방지..
  agent:false
};

var req = http.request(options, function(res) {
  res.on('data', function(data) {
  	
  	fs.appendFile('nooo_top250.html', data, 'utf8', function (error) {
  		if (error) {console.log('fsw error : '+error);}
  		// console.log('writeFile');
  	});
  	// fs.readFile('top250.html', function (error, data) {
  	// 	if (error) {console.log('fsr error : '+error);}
  	// 	console.log('read top250.html');
  	// 	// ref.: http://help.dottoro.com/ljssopjn.php
  	// 	if (!window.DOMParser) {console.log("no parser");}
  	// 	var parser = new DOMParser();
  	// 	var domDoc = parser.parseFromString(data, 'text/html');
  		
  	// 	var list = document.getElementsByClassName('posterColumn');
  	// 	var linkArray = [];
  	// 	for(i=0;i<list.length;i++) {
  	// 		linkArray.push(list[i].firstElementChild.href);
  	// 	}
  	// 	// 여기까지 생각하고 돌아가는지 테스트 해보려했음. 그 이후로 href마다 다시 GET요청 구현.
  	// 	fs.appendFile('movieLink.html', linkArray[i], 'utf8');
  	// });
  });
});
req.end();

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

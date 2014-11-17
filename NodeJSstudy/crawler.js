var https = require('https');

var options = {
  hostname: 'watcha.net',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {Cookie:'크롬개발자도구에서 얻어낸 쿠키값 입력. 개인정보보안을 위해 지움 ^^'}
};

var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
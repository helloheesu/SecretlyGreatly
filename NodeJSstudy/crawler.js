var https = require('https');

var options = {
  hostname: 'watcha.net',
  port: 443,
  path: '/',
  method: 'GET'
};

console.log('hi');

// http.get(options, function(res) {
// 	console.log('hello');
//   console.log("Got response: " + res.statusCode);
//   console.log("Got response: " + res);
//   for(var i=0; i<Object.keys(res).length; i++) {var j=(Object.keys(res))[i];console.log('['+j+']'+res[j]);}
//   console.log('done!!\n\ndone!!!!');
// }).on('error', function(e) {
// 	console.log('heesu');
//   console.log("Got error: " + e.message);
// });

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

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

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
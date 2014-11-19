process.on('exit', function() {
	setTimeout(function() {
		console.log('This will not run.');
	}, 0);
	setTimeout(function() {
		console.log('This will not run neither. Doesn\'t matter how long the time is.');
	}, 10);
	console.log('About to exit.');
});

process.on('uncaughtException', function (err) {
	console.log('Caught exception: '+err);
});

setTimeout(function() {
	console.log('This will still run.');
}, 500);

nonexistentFunc();

setTimeout(function() {
	console.log('This will not run. Why?');
}, 1000);
setTimeout(function() {
	console.log('This will not run neither. Maybe because it\'t after the undefined func.');
}, 500);

console.log('This will not run.');

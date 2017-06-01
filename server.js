var express = require('express');
var app = express ();
var path = require('path');
var childProcess = require('child_process');

childProcess.fork(__dirname + '/readTracks.js');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});

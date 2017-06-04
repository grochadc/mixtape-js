var express = require('express');
var app = express ();
var fileUpload = require('express-fileupload');
var path = require('path');
var childProcess = require('child_process');

childProcess.fork(__dirname + '/readTracks.js');

app.use(fileUpload());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', function(req,res) {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}

	var sampleFile = req.files.sampleFile;

	sampleFile.mv(path.join('./public/uploads/audio1.mp3'), function(err){
		if (err){
			return res.status(500).send(err);
		}
		res.send('File uploaded"');
	});
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});

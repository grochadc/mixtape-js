var id3 = require('node-id3');
var questions = require('questions');
var path = require('path');

var dir = path.join(__dirname, 'app/tracks/');

console.log(dir);

questions.askOne({ info: "Wanna write or read (w/r)" }, function(answer){
	switch(answer){
		case 'w':
			questions.askMany({	file: {info:'Filename'},
				title: {info:'Title'},
				artist: {info: 'Artist'}
			}, function (answer){
				var tags = {
					title: answer.title,
					artist: answer.artist,
			};
				var success = id3.write(tags,path.join(dir,answer.file));
				console.log(success ? 'id3 Tags successfully written' : 'There was an error');
				console.log(id3.read(path.join(dir,answer.file)));
			});
			break;
		case 'r':
			questions.askOne({info: 'Filename'}, function(answer){
				console.log(id3.read(path.join(dir,answer)));
			});
			break;
		default:
			console.log('Please write only w or r');
	}
});

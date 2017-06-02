var fs = require('fs');
var nodeID3 = require('node-id3');
var path = require('path');
var tracksPath = './public/tracks/';
var dataPath = './public/data/';

fs.readdir(tracksPath,function(err,files){
	if(err) {
		throw err;
	}
	//Read the tracks filenames
	fs.writeFile(path.join(dataPath,"tracks.json"),JSON.stringify(files), function(err){
		if (err){
			throw err;
		}
		console.log("Tracks JSON created succesfully");
	});
	//Read the tracks metadata
	var tracksMetadata = [];
	files.forEach(function(trackName){
		var trackFile = nodeID3.read(tracksPath + trackName);
		var metadata = {
			"filename" : trackName,
			"title" : trackFile.title,
			"artist" : trackFile.artist
		};
		tracksMetadata.push(metadata);
	});
	fs.writeFile(path.join(dataPath, 'metadata.json'), JSON.stringify(tracksMetadata), function(err){
		if(err){
			throw err;
		}
		console.log("Tracks Metadata JSON created succesfully");
	});
});

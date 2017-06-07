var fs = require('fs');
var nodeID3 = require('node-id3');
var path = require('path');
var tracksPath = './app/tracks/';
var dataPath = './app/data/';

fs.readdir(tracksPath,function(err,files){
	if(err) {
		throw err;
	}
	//Read the tracks metadata
	var tracksMetadata = [];
	files.forEach(function(trackName){
		var trackFile = nodeID3.read(tracksPath + trackName);


		//If the track returns metadata push it to the array
		if (trackFile.title && trackFile.artist){
			var metadata = {
				"filename" : trackName,
				"title" : trackFile.title,
				"artist" : trackFile.artist
			};
			tracksMetadata.push(metadata);
		}

		//If no metadata is found ignore and log it to the console
		else if (trackName.charAt(0) != "."){
			var filename = {
				  "filename" : trackName
			};

			tracksMetadata.push(filename);

			console.log(trackName + " doesn't have metadata. Ignoring.");
		}
	});

	fs.writeFile(path.join(dataPath, 'metadata.json'), JSON.stringify(tracksMetadata), function(err){
		if(err){
			throw err;
		}
		console.log("Tracks Metadata JSON created succesfully");
	});
});

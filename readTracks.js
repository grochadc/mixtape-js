var fs = require('fs');
var nodeID3 = require('node-id3');
var path = require('path');
var sorting = require('./libs/compare-arrays.js');

var tracksPath = './public/tracks/';
var dataPath = './public/data/';

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

	fs.readFile(path.join(dataPath, 'metadata.json'),'utf8',function(err,data){
		if(err) throw err;
		var dataObj = JSON.parse(data);
		var dataSorted = dataObj.slice(0).sort(sorting.compare);

		if (dataObj.length == tracksMetadata.length) {
			if(JSON.stringify(dataSorted) == JSON.stringify(tracksMetadata)){
				console.log('Content in public/tracks/ and metadata.json are the same. Not writing file');
			}
		}
		else if(dataObj.length != tracksMetadata.length){
			fs.writeFile(path.join(dataPath, 'metadata.json'), JSON.stringify(tracksMetadata), function(err){
				if(err){
					throw err;
				}
				console.log("Tracks Metadata JSON created succesfully");
			});
		}
	});

});

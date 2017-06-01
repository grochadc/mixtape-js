var fs = require('fs');
var p = 'public/tracks/';

fs.readdir(p,function(err,files){
	if(err) {
		throw err;
	}
	fs.writeFile("./public/data/tracks.json",JSON.stringify(files), function(err){
		if (err){
			throw err;
		}
		console.log("Tracks JSON created succesfully");
	});
});
	

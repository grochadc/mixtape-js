$(function() {

	nw.Window.get().showDevTools();

	// Initialize the player, tracks array as well as track number and time
	var player = $('#player');
	tracks = []; //This array will be populated with the filenames from metadata.json
	currentTrack = localStorage.track === undefined ? 0 : localStorage.track;
	currentTrackTime = localStorage.time === undefined ? 0 : localStorage.time;

	//jQuery AJAX to push the JSON from tracks.json to the tracks array defined earlier.
	$.getJSON("../data/metadata.json", function(data){
		$.each(data, function(key, val){
			tracks.push(val.filename);
		});
		setupPlayer(); //execute the rest of the code when the async $.getJSON is finished
		console.log('player set up');
	});

	//Get the metadata for the playlist and append it to the #tracklist div
	$.getJSON("../data/metadata.json", function(data){
		var items = [];
		$.each( data, function( key, val ){
			items.push("<li id='"+ key +"'>" + val.artist  + " - " + val.title + "</li>");
		});

		$("<ol/>",{
			"class": "my-new-list",
			html: items.join( "" )
		}).appendTo( "#tracklist" );
	});

	//Create a function that sets up the player source, time and events
	function setupPlayer(){
		window.currentTrackSource = './tracks/' + tracks[currentTrack];
		player[0].src = currentTrackSource;
		player[0].currentTime = currentTrackTime;

		player.bind('pause', function(){
			timeStopped = player[0].currentTime;
			console.log('Player paused at ' + timeStopped + ' track ' + currentTrack);
			console.log(localStorage);
			localStorage.track = currentTrack;
			localStorage.time = timeStopped;
		});

		player.bind('ended', function(){
			if(currentTrack<=tracks.length){
				currentTrack++;
				Cookie.set('track',currentTrack);
				player[0].src = currentTrackSource;
				player[0].play();
			}

			else{
				console.log('Reached the end of the mixtape');
				Cookie.set('track',0);
			}
		});
	}
})

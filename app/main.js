$(function() {

	nw.Window.get().showDevTools();

	// Initialize the player, tracks array as well as track number and time
	var player = $('#player');
        window.tracks = []; //This array will be populated with the filenames from metadata.json
	window.currentTrack = localStorage.track === undefined ? 0 : localStorage.track;
	window.currentTrackTime = localStorage.time === undefined ? 0 : localStorage.time;

	//jQuery AJAX to push the JSON from tracks.json to the tracks array defined earlier.
	$.getJSON("../data/metadata.json", function(data){
		$.each(data, function(key, val){
			tracks.push(val.filename);
		});
		setupPlayer(); //execute the rest of the code when the async $.getJSON is finished
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
	window.setupPlayer = function(){
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
				console.log('Still songs to play');

				currentTrack++;
				localStorage.track = currentTrack;


				currentTrackSource = './tracks/' + tracks[currentTrack];

				debugInfo();

				player[0].src = currentTrackSource;
				player[0].play();
			}

			else{
				console.log('Reached the end of the mixtape');
				localStorage.track = 0;
				localStorage.time = 0;
			}
		console.log('player set up');
		});
	};

	window.debugInfo = function(){
		console.log('tracks: ' + tracks);
		console.log('currentTrack: ' + currentTrack);
		console.log('currentTrackTime: ' + currentTrackTime);
		console.log('currentTrackSource: ' + currentTrackSource);
		console.log('player: ' + JSON.stringify(player));
		console.log('localStorage: ' + JSON.stringify(localStorage[0]));
		console.log('tracks[currentTrack]: ' + tracks[currentTrack] );
		console.log('tracks.length: ',tracks.length);
		console.log('currentTrack <= tracks.length: ',Boolean(currentTrack <= tracks.length));
	};

	window.endTrack = function(){
		//Code to force the current track to end on Console
		player.trigger("ended");
	};
});

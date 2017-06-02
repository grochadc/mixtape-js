$(function() {

	// Initialize the player, tracks array as well as track number and time
	var player = $('#player');
	var tracks = []; //This array will be populated with the content of tracks.JSON
	var currentTrack = Cookie.get('track',0);
	var currentTrackTime = Cookie.get('time',0); 

	//jQuery AJAX to push the JSON from tracks.json to the tracks array defined earlier.
	$.getJSON("../data/tracks.json", function(data){
		$.each(data, function(key, val){
			tracks.push(val);
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
	function setupPlayer(){
		var currentTrackSource = './tracks/' + tracks[currentTrack];
		player[0].src = currentTrackSource;
		player[0].currentTime = currentTrackTime;

		player.bind('pause', function(){
			timeStopped = player[0].currentTime;
			console.log('Player paused at ' + timeStopped + ' track ' + currentTrack);
			Cookie.set('track',currentTrack);
			Cookie.set('time',timeStopped);
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
});

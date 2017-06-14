$(function() {


	// Initialize the player, tracks array as well as track number and time
	var player = $('#player');
        window.tracks = []; //This array will be populated with the filenames from metadata.json
	window.currentTrack = Cookie.get('track',0);
	window.currentTrackTime = Cookie.get('time',0);

	//Get the metadata for the playlist and append it to the #tracklist div
	$.getJSON("../data/metadata.json", function(data){
		console.log('Entered getJSON');
		var items = [];
		$.each( data, function( key, val ){
			console.log('Entered .each Iterator: ',key,val);
			tracks.push(val.filename);
			items.push("<li id='"+ key +"'>" + val.artist  + " - " + val.title + "</li>");
		});

		setupPlayer(items); //execute the rest of the code when the async $.getJSON is finished

	});

	//Create a function that sets up the player source, time and events
	window.setupPlayer = function(items){
		window.currentTrackSource = './tracks/' + tracks[currentTrack];
		player[0].src = currentTrackSource;
		player[0].currentTime = currentTrackTime;


		$("<ol/>",{
			"class": "trackList",
			html: items.slice(0,Number(currentTrack)+1).join( "" )
		}).appendTo( "#tracklist" );

		player.bind('pause', function(){
			timeStopped = player[0].currentTime;
			console.log('Player paused at ' + timeStopped + ' track ' + currentTrack);
			console.log(document.cookie);
			Cookie.set('track',currentTrack);
			Cookie.set('time',currentTrackTime);
		});

		player.bind('ended', function(){
			if(currentTrack<=tracks.length){
				console.log('Still songs to play');

				currentTrack++;
				$(".trackList").append(items[currentTrack]);
				Cookie.set('track', currentTrack);

				currentTrackSource = './tracks/' + tracks[currentTrack];

				debugInfo();

				player[0].src = currentTrackSource;
				player[0].play();
			}

			else{
				console.log('Reached the end of the mixtape');
				Cookie.set('track',0);
				Cookie.set('time',0);
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

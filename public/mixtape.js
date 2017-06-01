$(function() {
	var player = $('#player');	
	var currentTrack = Cookie.get('track',0);
	var track = ['audio1.mp3','audio2.mp3'];
	player[0].src = track[currentTrack];
	player[0].currentTime = Cookie.get('time',0);

	player.bind('pause', function(){
		timeStopped = player[0].currentTime;
		console.log('Player paused at ' + timeStopped + ' track ' + currentTrack);
		Cookie.set('track',currentTrack);
		Cookie.set('time',timeStopped);
	});

	player.bind('ended', function(){
		if(currentTrack<=track.length){
			currentTrack++;
			Cookie.set('track',currentTrack);
			player[0].src = track[currentTrack];
			player[0].play();
		}

		else{
			console.log('Reached the end of the mixtape');
			currentTrack = 0;
		}
	});

});

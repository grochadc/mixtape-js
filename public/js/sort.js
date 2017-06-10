$(function(){

	window.tracks = [];
	var newOrder = [];

	
	function rearrange(toSort,order){
		    var sorted = [];
		    order.forEach(function(i){
			    		sorted.push(toSort[i]);
		    	});
		return sorted;
	}


	window.getPlaylist = function() {
		var tracklist = $('.playlist').children();
		tracklist.each(function(index) {
			newOrder.push( parseInt(tracklist[index].id));
		});
		var newPlaylistStr = JSON.stringify(rearrange(tracks,newOrder));
		console.log('Playlist ordered:', newPlaylistStr);
		localStorage.playlist = newPlaylistStr;
	};

	window.renderPlaylist = function(data){ //whenever this function is called a variable named data must be passed to it containing the plist as an arr of objs
		var items = [];
		tracks = data;
		$.each( data, function( key, val ){
			items.push("<li id='"+ key +"'>" + val.artist  + " - " + val.title + "</li>");
		});
		$("<ol/>",{
			"class": "playlist",
			html: items.join( "" )
		}).appendTo( "#tracklist" );
		var el = $('.playlist')[0];
		var sortable =  Sortable.create(el);
	};

	if (localStorage.playlist === undefined){ //IF theres nothing in the localStorage find the metadata.json..
		console.log('Getting data from JSON');
		$.getJSON("../data/metadata.json", function(data){

			tracks = data;
			renderPlaylist(data);
		});
	}

	else{ //but if there is something in localStorage render that data
		console.log('getting data from localStorage');
		var data = JSON.parse(localStorage.playlist);
		renderPlaylist(data);
	}
});

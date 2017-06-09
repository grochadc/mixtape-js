$(function(){

	var tracks = [];
	var newOrder = [];
	$.getJSON("../data/metadata.json", function(data){
		tracks = data;
		var items = [];
		$.each( data, function( key, val ){
			items.push("<li id='"+ key +"'>" + val.artist  + " - " + val.title + "</li>");
		});

		$("<ol/>",{
			"class": "my-new-list",
			html: items.join( "" )
		}).appendTo( "#tracklist" );

		var el = $('.my-new-list')[0];
		var sortable =  Sortable.create(el);
	});

	 window.getPlaylist = function() {
		    var tracklist = $('.my-new-list').children();
		    tracklist.each(function(index) {
			           newOrder.push( parseInt(tracklist[index].id));
			        });
		var newPlaylistStr = JSON.stringify(rearrange(tracks,newOrder));
		console.log('Playlist ordered:', newPlaylistStr);
		localStorage.playlist = newPlaylistStr;


	};

	function rearrange(toSort,order){
		    var sorted = [];
		    order.forEach(function(i){
			    		sorted.push(toSort[i]);
		    });
		return sorted;
	}
});

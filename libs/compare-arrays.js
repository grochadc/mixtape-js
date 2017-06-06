module.exports = {
	compare: function(a, b) {
		// Use toUpperCase() to ignore character casing
		var propertyA = a[Object.keys(a)[0]].toUpperCase();
		var propertyB = b[Object.keys(b)[0]].toUpperCase();
		
		var comparison = 0;
		if (genreA > genreB) {
			comparison = 1;
		} else if (genreA < genreB) {
		         comparison = -1;
		}
		return comparison;
	},

	sortCopy: function(arr){
		return arr.slice(0).sort(this.compare);
	}
};

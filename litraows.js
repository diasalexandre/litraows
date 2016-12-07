var foursquare = (require('foursquarevenues'))('OX2IE5QDN53J0YDYQIS4ZUBX1ET12JTHJVZDYIJXPFIWHBX4', 'Y5IDNGMUDB1LT2JKCFKX54IR23QLBEYJVQGQ45WNAVDEO5BL');

var paramTemplate = {
	"section": "drinks",
	"radius": 100,
	"ll": null
};
 
var paramStart = {
    "near": "Manaus,AM",
    "radius": 500,
    "section": "drinks",
    "categoryId": "4bf58dd8d48988d116941735"
};

var arrayPlaces = [],
	arrayNewParams = [],
	stop = 0;

var callGetVenues = function(param) {
	foursquare.getVenues(param, function(error, venues) {
	    if (!error) {
	    	var count = venues.response.venues.length;

	    	for (var i = 0; i < count; i++) {
	    		var newParam = paramTemplate;
	    		newParam.ll = venues.response.venues[i].location.lat + ',' + venues.response.venues[i].location.lng;

	    		console.log(venues.response.venues);
	    		arrayPlaces.push(venues.response.venues[i]);

	    		if (typeof arrayNewParams[venues.response.venues[i].name] === 'undefined') {
					arrayNewParams[venues.response.venues[i].name] = newParam;
	    		}
	    	}

	    	stop++;

	    	if (stop == 500) {
	    		return;
	    	}

	    	for (var idx in arrayNewParams) {
	    		//callGetVenues(arrayNewParams[idx]);
	    	}

	    	arrayNewParams = [];

	    }
	});
}

callGetVenues(paramStart);

console.log(arrayPlaces);

for (var i = 0; i < arrayPlaces.length; i++) {
	console.log(arrayPlaces[i].name);
}

/*foursquare.exploreVenues(params, function(error, venues) {
    if (!error) {
		console.log(venues);
    }
});*/
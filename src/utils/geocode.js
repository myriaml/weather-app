const request = require('request')

const geocode = (adresse,callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adresse) + '.json?access_token=pk.eyJ1IjoibXlyaWFtbGVmZWJ2cmUiLCJhIjoiY2p3aWZxdDVnMGdwbzQ0bXg1cWY0M2FjNCJ9.Q_67hDodODUvDA39PZRLeA'
	request({ url, json: true }, (error, {body}) => {
		if(error){
			callback('Impossible de ce connecter à Geocoding',undefined)
		}
		else if(body.features.length === 0){
			callback('Impossible de trouver les coordonées. Essayer un nouvelle recherche.',undefined)
		}
		else{
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})

		}
	})
}

module.exports = geocode
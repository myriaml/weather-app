const request = require('request')

const forecast = (latitude,longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/54e6fc29677817abeb48080ac964eecd/' + latitude +','+longitude + '?lang=fr&units=si'
	request({ url, json: true }, (error,{body}) => {
		if(error){
			callback('Impossible de ce connecter à l\'api de météo',undefined)
		}
		else if(body.error){
			callback('Localisation impossible',undefined)
		}
		else{
			const currently = body.currently
			callback(undefined,body.daily.data[0].summary + ' Il fait présentement: ' + currently.temperature + ' degrés et il y a '+ currently.precipProbability + '% de chance de pleuvoir!. Le taux d\'humidité est de: '+body.daily.data[0].humidity)
		}
	})
}

module.exports = forecast
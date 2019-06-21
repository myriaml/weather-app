const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define path of express config
const app = express()
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialDir = path.join(__dirname,'../templates/partials')

//Setup handlebar and view location
app.set('view engine', 'hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialDir)

//setup static directory to search
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index',{
    	title: 'Weather app',
    	name: 'Myriam Lefebvre'

    })
})
app.get('/about', (req, res) => {
	res.render('about',{
		title: 'About page',
		img: '/imgs/robot.png',
		name: 'Myriam Lefebvre'
	})
})
app.get('/help',(req,res) => {
	res.render('help',{
		title: 'Help page',
		helpText: 'Avez vous besoin d\'aide pour lire la météo? Ou pour utiliser l\'application? Ou pour autre chose?Je suis là',
		name: 'Myriam Lefebvre'
	})
})
app.get('/weather',(req, res) => {
	const adresse = req.query.adresse
	if(!req.query.adresse){
		return res.send({
			error: 'Entrer une adresse s.v.p'
		})
	}
	geocode(adresse,(error,{ latitude, longitude, location } = {}) => {
		if(error){
			return res.send({
				error
			})
		}
		forecast(latitude,longitude, (error, forecastData) => {

			if(error){
				return res.send({
					error
				})
			}
			res.send({
				forecast: forecastData,
				location: location,
				adresse
			})
		})
	})
})

app.get('/product',(req,res) => {
	if(!req.query.search){
		return res.send({
			error: 'Entrer une recherche'
		})
	}
	console.log(req.query.search)
	res.send({
		product: []
	})
})

app.get('/help/*',(req,res) => {
	res.render('404',{
		title: '404',
		name: 'Myriam Lefebvre',
		404: 'L\'article d\'aide est introuvable'
	})
})

app.get('*',(req,res) => {
	res.render('404',{
		title: '404',
		name: 'Myriam Lefebvre',
		404: 'Page introuvable'
	})
})

app.listen(3000,() => {
	console.log('server is up on port 3000')
})
console.log('hello')
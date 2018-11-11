var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser')
const request = require('request')
require('dotenv').config()

router.use(bodyParser.urlencoded({ extended: false }))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: 'Weather App',
		weather: null  
	});
});

router.post('/', (req, res, next) => {
	let city = req.body.city
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=imperial`
	let weather = {} 
	request(url, (err, response, body) => {
		if (!err) {
			weather = JSON.parse(body)
			if (weather.main !== undefined) {
				res.render('index', {
					title: 'Weather App',
					weather
				})
			} else {
				res.render('index', {
					title: 'Weather App',
					weather: { err: 'Invalid city name' } 
				})
			}
		} else {
			res.render('index', { 
				title: 'Weather App',
				weather: { err: 'Invalid URL or API key' }
			});
		}
	})
})

module.exports = router;

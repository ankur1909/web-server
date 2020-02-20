const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// Routes

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ankur tripathi'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'ankur tripathi'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'ankur tripathi'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must send an address parameter'
        })
    }
    const loc = geocode(req.query.address, (error,location) => {
        if(error) {
            return res.send ({error});
        }
        forecast(location, (error, data) => {
            res.send({
                forecast: data,
                location: location.placeName,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMessage: 'No help article found',
        name:'ankur tripathi'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: 'My 404 page',
        name:'ankur tripathi'
    })
})

//Server to listen to

app.listen(3000, () => {
    console.log('Server is up!');
})
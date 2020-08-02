const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;
//require geocode and forecast
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'weathering with u',
    name: 'Onse',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Onse',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Contact me',
    name: 'Jan Eleven',
    address: 'Marikina City',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('errorPage', {
    title: 'Help article not found',
    name: 'Onse',
  });
});
app.get('*', (req, res) => {
  res.render('errorPage.hbs', {
    title: 'Page not found',
    name: 'Onse',
  });
});

app.listen(port, () => {
  console.log('Server is up on ' + port);
});

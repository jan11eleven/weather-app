const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=ddd7fad1af5635b466fc45bfae020a62&query=' +
    lat +
    ',' +
    long;

  request({ url, json: true }, (error, response) => {
    const {
      temperature,
      feelslike,
      weather_descriptions: weather,
    } = response.body.current;
    if (error) {
      callback('Unable to connect!', undefined);
    } else if (response.body.error) {
      callback('Invalid input!', undefined);
    } else {
      callback(
        undefined,
        `${weather[0]}. It is currently ${temperature} (°C) degrees  out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;

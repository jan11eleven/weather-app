const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiamFuMTFlbGV2ZW4iLCJhIjoiY2tkNXh5dTBjMHRvMzMxb2RzMjMwb2diZiJ9.bGsHl4SjLLuMtgT6mwzUnw&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location!', undefined);
    } else if (body.features.length === 0) {
      callback('Location not found!', undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;

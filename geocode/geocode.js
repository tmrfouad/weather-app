const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request(
    {
      url: `https://geocoder.tilehosting.com/q/${encodedAddress}.js?key=sg0ycM5zjUDwJDeomH0O`,
      json: true
    },
    (error, response, body) => {
      var errorMessage;
      var results;
      if (error) {
        errorMessage = 'Unable to connect to the servers.';
      } else if (body.totalResults === 0) {
        errorMessage = 'Unable to find that address.';
      } else if (body.totalResults > 0) {
        results = {
          address: body.results[0].display_name,
          latitude: body.results[0].lat,
          longitude: body.results[0].lon
        };
      }
      callback(errorMessage, results);
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;

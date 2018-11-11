const request = require('request');

var geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    request(
      {
        url: `https://geocoder.tilehosting.com/q/${encodedAddress}.js?key=sg0ycM5zjUDwJDeomH0O`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to the servers.');
        } else if (body.totalResults === 0) {
          reject('Unable to find that address.');
        } else if (body.totalResults > 0) {
          resolve({
            address: body.results[0].display_name,
            latitude: body.results[0].lat,
            longitude: body.results[0].lon
          });
        }
      }
    );
  });
};

geocodeAddress('alex egypt').then(
  location => {
    console.log(JSON.stringify(location, undefined, 2));
  },
  error => {
    console.log(error);
  }
);

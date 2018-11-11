const request = require('request');

request(
  {
    url:
      'https://geocoder.tilehosting.com/q/1301%20lombard%20street%20philadelphia.js?key=sg0ycM5zjUDwJDeomH0O',
    json: true
  },
  (error, response, body) => {
    console.log(body);
  }
);

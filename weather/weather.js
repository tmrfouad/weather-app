const request = require('request');

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/378fe0ecde4cd74c91bb986f69f61c14/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      var errorMessage;
      var results;

      if (error) {
        errorMessage = 'Unable to connect to the servers.';
      } else if (response.statusCode === 400) {
        errorMessage = 'The given location (or time) is invalid.';
      } else if (response.statusCode === 200) {
        const fTemp = body.currently.temperature;
        const fApparentTemp = body.currently.apparentTemperature;

        const cTemp = ((fTemp - 32) * 5) / 9;
        const cApparentTemp = ((fApparentTemp - 32) * 5) / 9;
        results = { temperature: cTemp, apparentTemperature: cApparentTemp };
      }

      callback(errorMessage, results);
    }
  );
};

module.exports.getWeather = getWeather;

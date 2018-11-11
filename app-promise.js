const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://geocoder.tilehosting.com/q/${encodedAddress}.js?key=sg0ycM5zjUDwJDeomH0O`;

axios
  .get(geocodeUrl)
  .then(response => {
    // if (response.data.totalResults === 0) {
    //   throw new Error('Unable to find that address.');
    // }

    const lat = response.data.results[0].lat;
    const lng = response.data.results[0].lon;
    const weatherUrl = `https://api.darksky.net/forecast/378fe0ecde4cd74c91bb986f69f61c14/${lat},${lng}`;

    console.log(response.data.results[0].display_name);
    return axios.get(weatherUrl);
  })
  .then(response => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}.`
    );
  })
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to the servers.');
    } else if (error.response.status === 400) {
      console.log('Unable to find that address.');
    } else {
      console.log(error.message);
    }
  });

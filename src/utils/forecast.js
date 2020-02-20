const request = require('request');


const forecast = ({location, placeName}, callback) => {
    const url = `https://api.darksky.net/forecast/d2f421c1ff097bb771aeb1032c04cb77/${location}`;
    request({ url, json: true},(error,response,body) => {
        if(error) {
            callback('Unable to fetch weather from API');
        }
        else if(body.code === 400) {
            callback(body.error);
        }
        else {
            callback(undefined, ` In ${placeName} it is ${body.daily.data[0].summary}It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain today. `)
        }
    });
}

module.exports = forecast;

const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5rdXIxOTA5IiwiYSI6ImNrNmVsdmg4YjBmYjIza3FwemNtYzE0MWkifQ._ZdbPjUEIoogr030OhZbKg`
    request({url, json:true}, (error,response,body) => {
        if(error) {
            callback('Unable to connect to geocoding service.');
        }
        else if(body.features.length === 0) {
            callback('No such place found.Try another search term.');
        }
        else {
            const location = body.features[0].center.reverse().join(',');
            const placeName = body.features[0].place_name;
            callback(undefined, {location,placeName});
        }
    });
}

module.exports = geocode;
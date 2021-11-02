const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address)+'.json?access_token=pk.eyJ1Ijoic2lkLW1haGFqYW4iLCJhIjoiY2t1bDU5aTN1MWU4MDJwbjZybnljZTZtciJ9.qnSpURSCUuN0OX8kO6ArqQ&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location.Try another search')
        } else {
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
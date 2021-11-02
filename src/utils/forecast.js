const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa11352ad59ecea6de9c1c8a3da7f267&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services')
        } else if(body.error){
            callback('Unable to find location')
        } else {
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.')
        }
        })
    


}

module.exports = forecast
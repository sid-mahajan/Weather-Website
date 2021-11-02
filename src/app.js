const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()
//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Define handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Siddharth Mahajan'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Siddharth Mahajan'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helptext: 'Need my help!',
        title: 'Help',
        name: 'Siddharth Mahajan'
    })
})

app.get('', (req, res) => {
    res.send('Hello express')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page!</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error:'Please Provide the Address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
          return res.send({
              error:error
          })
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({
                error:error
            })
          }
          res.send({
              location:location,
              forecast:forecastData,
              address:req.query.address
          })
        })
    })
})

app.get('/products', (req,res) => {
   if(!req.query.search){
      return res.send({
           error: 'You must provide a search term'
       })
   }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title: '4O4',
        name: 'Siddharth Mahajan',
        errorMessage: 'Help Article Not Found!'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title: '4O4',
        name: 'Siddharth Mahajan',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
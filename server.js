// dependencies
const express = require('express') 
const mongoose = require('mongoose') 
const morgan = require('morgan') 
require('dotenv').config() 
const path = require('path') 

// import model
const Object = require('./models/fruit')

// database connection
const DATABASE_URL = process.env.DATABASE_URL

// config
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to db
mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

// express app object
const app = express()

app.use(morgan('tiny')) // request logging
app.use(express.urlencoded({ extended: true })) // parses urlEncoded request bodies
app.use(express.static('public')) // serves static assets from the public folder
app.use(express.json()) // parses incoming request payloads with JSON

// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

// seed data
app.get('/objects/seed', (req, res) => {

    const startObjects = [
        { title: 'Terracotta conical rhyton (ritual vessel)', description: 'With fern pattern in red and black.', period: 'Late Minoan IA', date: 'ca. 1600–1525 BCE', culture: 'Minoan', medium: 'Terracotta; Fine painted ware, Floral style', classification: 'Vases', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/256787/532568/main-image' }
    ]
})
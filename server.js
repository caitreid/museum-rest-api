// dependencies
const express = require('express') 
const mongoose = require('mongoose') 
const morgan = require('morgan') 
require('dotenv').config() 
const path = require('path') 
// const port = 3000

// Import routes
const ObjectRouter = require('./controllers/objectControllers')
const UserRouter = require('./controllers/userController')


// import model
const Object = require('./models/object')

// database connection
// const DATABASE_URL = process.env.DATABASE_URL
DATABASE_URL='mongodb://localhost/museum-rest-api'

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

// app.use(morgan('tiny')) // request logging
// app.use(express.urlencoded({ extended: true })) // parses urlEncoded request bodies
// app.use(express.static('public')) // serves static assets from the public folder
// app.use(express.json()) // parses incoming request payloads with JSON

app.use(morgan('tiny')) // this is for request loggging, the 'tiny' argument declares what size of morgan log to use
app.use(express.urlencoded({ extended: true })) // this parses urlEncoded request bodies(useful for POST and PUT requests)
app.use(express.static('public')) // this serves static files from the 'public' folder
app.use(express.json()) // parses incoming request payloads with JSON

process.on('uncaughtException', function (err) {
    console.log(err);
});


// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

app.use('/objects', ObjectRouter)






const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
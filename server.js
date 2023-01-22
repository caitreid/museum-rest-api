// dependencies
const express = require('express')  
// const morgan = require('morgan') 
require('dotenv').config() 
const path = require('path') 
const middleware = require('./utils/middleware')

// Import routes
const ObjectRouter = require('./controllers/objectController')
const UserRouter = require('./controllers/userController')


// express app object
const app = express()

middleware(app)


// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

app.use('/objects', ObjectRouter)
// app.use('/users', UserRouter)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
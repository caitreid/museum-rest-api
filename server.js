// dependencies
const express = require('express')  
require('dotenv').config() 
const path = require('path') 
const middleware = require('./utils/middleware')

// Import routes
const ObjectRouter = require('./controllers/objectController')
const UserRouter = require('./controllers/userController')
const CommentRouter = require('./controllers/commentController')

// express app object
const app = express()

middleware(app)


// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

app.use('/objects', ObjectRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentRouter)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
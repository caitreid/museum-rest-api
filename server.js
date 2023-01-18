// dependencies
const express = require('express') 
const mongoose = require('mongoose') 
const morgan = require('morgan') 
require('dotenv').config() 
const path = require('path') 
// const port = 3000

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

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})


// seed data
app.get('/objects/seed', (req, res) => {

    const startObjects = [
        { title: 'Terracotta conical rhyton (ritual vessel)', description: 'With fern pattern in red and black.', period: 'Late Minoan IA', date: 'ca. 1600–1525 BCE', culture: 'Minoan', medium: 'Terracotta; Fine painted ware, Floral style', classification: 'Vases', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/256787/532568/main-image', onView: false},
        { title: 'Terracotta larnax (chest-shaped coffin)', description: 'The larnax was the standard type of coffin in Crete from the early fourteenth century to the twelfth century B.C. The structure with recessed panels on each side suggests a wooden prototype, and recent scholarship has identified Egyptian chests as the probable models. The decoration on each side consists of geometric and vegetal ornaments well represented on contemporary pottery. The larnax stands at the beginning of an impressive series of large-scale funerary monuments in the Greek and Roman collection.', period: 'Late Minoan IIIB', date: 'mid-13th century BCE', culture: 'Minoan', medium: 'Terracotta', classification: 'Terracottas', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/256844/538397/main-image', onView: true},
        { title: "Terracotta vase in the form of a bull's head", description: "This vase is a type of rhyton, or libation vase. The offering was poured through the hole in the animal's muzzle. The vase was filled either by immersion in a large container or through the hole on the head. Using the principle of the siphon, liquid would not flow out as long as the opening at the top was closed with the thumb.", period: 'Late Minoan II', date: 'ca. 1450–1400 BCE', culture: ' Minoan', medium: 'Terracotta', classification: 'Vases', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/255506/543530/main-image', onView: true},
        // { title: 'test', description: '', period: '', date: '', culture: '', medium: '', classification: '', image: '', onView: false},
    ]

    Object.deleteMany({})
        .then(() => {
            Object.create(startObjects)
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occured: \n', err))

        })
})

//index routes
app.get('/objects', (req, res) => {
    Object.find({})
        .then(objects => { res.json({ objects: objects })})
        .catch(err => console.log('The following error occurred: \n', err))
})

// create route
app.post('/objects', (req, res) => {
    
    const newObject = req.body
    
    Object.create(newObject)
        .then(object => {
            res.status(201).json({ object: object.toObject() })
        })
        .catch(err => console.log(err))
})

// PUT route
app.put('/objects/:id', (req, res) => {

    const id = req.params.id
    const updatedObject = req.body

    Object.findByIdAndUpdate(id, updatedObject, { new: true })
        .then(object => {
            console.log('the newly updated object', object)

            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// Delete
app.delete('/objects/:id', (req, res) => {

    const id = req.params.id

    Object.findByIdAndRemove(id)
        .then( () => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// Show
app.get('/objects/:id', (req, res) => {

    const id = req.params.id

    Object.findById(id)
        .then(object => {
            res.json({ object: object})
        })
        .catch(err => console.log(err))
})






const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
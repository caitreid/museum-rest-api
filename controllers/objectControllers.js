// dependencies
const express = require('express')
const Object = require('../models/object')

// Create Router
const router = express.Router()

// seed data
router.get('/objects/seed', (req, res) => {

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

// GET index routes
router.get('/', (req, res) => {
    Object.find({})
        .then(objects => { res.json({ objects: objects })})
        .catch(err => console.log('The following error occurred: \n', err))
})

// create route
router.post('/objects', (req, res) => {
    
    const newObject = req.body
    
    Object.create(newObject)
        .then(object => {
            res.status(201).json({ object: object.toObject() })
        })
        .catch(err => console.log(err))
})

// PUT route
router.put('/objects/:id', (req, res) => {

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
router.delete('/objects/:id', (req, res) => {

    const id = req.params.id

    Object.findByIdAndRemove(id)
        .then( () => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// GET Show
router.get('/objects/:id', (req, res) => {

    const id = req.params.id

    Object.findById(id)
        .then(object => {
            res.json({ object: object})
        })
        .catch(err => console.log(err))
})

module.exports = router
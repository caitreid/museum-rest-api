// dependencies
const express = require('express')
const Object = require('../models/object')


// Create Router
const router = express.Router()



// GET index routes
router.get('/', (req, res) => {
    // find all the fruits
    Object.find({})
        // there's a built in function that runs before the rest of the promise chain
        // this function is called populate, and it's able to retrieve info from other documents in other collections
        // .populate('owner', '-password')
        // send json if successful
        .then(objects => { res.json({ objects: objects })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})


// // create route
router.post('/', (req, res) => {
    
    const newObject = req.body
    
    Object.create(newObject)
        .then(object => {
            res.status(201).json({ object: object.toObject() })
        })
        .catch(err => console.log(err))
})

// PUT route
router.put('/:id', (req, res) => {

    const id = req.params.id
    const updatedObject = req.body

    Object.findByIdAndUpdate(id, updatedObject, { new: true })
        .then(object => {

            // logged to the terminal
            console.log('the newly updated object', object)

            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// // Delete
router.delete('/:id', (req, res) => {

    const id = req.params.id

    Object.findByIdAndRemove(id)
        .then( () => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// GET Show
router.get('/:id', (req, res) => {

    const id = req.params.id

    Object.findById(id)
        .then(object => {
            res.json({ object: object})
        })
        .catch(err => console.log(err))
})

module.exports = router
/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Object = require('../models/object')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

// INDEX route 
// Read -> finds and displays all objects
router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // find all the objects
    Object.find({})
        // there's a built in function that runs before the rest of the promise chain
        // this function is called populate, and it's able to retrieve info from other documents in other collections
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        // send json if successful
        .then(objects => { 
            // res.json({ objects: objects })
            // now that we have liquid installed, we're going to use render as a response for our controllers
            res.render('objects/index', { objects, username, loggedIn, userId })
        })
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET for the new page
// shows a form where a user can create a new object
router.get('/new', (req, res) => {
    res.render('objects/new', { ...req.session })
})

// CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    // console.log('this is req.body before owner: \n', req.body)
    // here, we'll have something called a request body
    // inside this function, that will be called req.body
    // we want to pass our req.body to the create method
    // we want to add an owner field to our object
    // luckily for us, we saved the user's id on the session object, so it's really easy for us to access that data
    req.body.owner = req.session.userId

    // we need to do a little js magic, to get our checkbox turned into a boolean
    // here we use a ternary operator to change the on value to send as true
    // otherwise, make that field false
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    const newObject = req.body
    console.log('this is req.body aka newobject, after owner\n', newObject)
    Object.create(newObject)
        // send a 201 status, along with the json response of the new object
        .then(object => {
            // in the API server version of our code we sent json and a success msg
            // res.status(201).json({ object: object.toObject() })
            // we could redirect to the 'mine' page
            // res.status(201).redirect('/objects/mine')
            // we could also redirect to the new object's show page
            res.redirect(`/objects/${object.id}`)
        })
        // send an error if one occurs
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route
// Index -> This is a user specific index route
// this will only show the logged in user's objects
router.get('/mine', (req, res) => {
    // find objects by ownership, using the req.session info
    Object.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(objects => {
            // if found, display the objects
            // res.status(200).json({ objects: objects })
            res.render('objects/index', { objects, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for getting json for specific user objects
// Index -> This is a user specific index route
// this will only show the logged in user's objects
router.get('/json', (req, res) => {
    // find objects by ownership, using the req.session info
    Object.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(objects => {
            // if found, display the objects
            res.status(200).json({ objects: objects })
            // res.render('objects/index', { objects, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            res.status(400).json(err)
        })
})

// GET request -> edit route
// shows the form for updating a object
router.get('/edit/:id', (req, res) => {
    // because we're editing a specific object, we want to be able to access the object's initial values. so we can use that info on the page.
    const objectId = req.params.id
    Object.findById(objectId)
        .then(object => {
            res.render('objects/edit', { object, ...req.session })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// PUT route
// Update -> updates a specific object(only if the object's owner is updating)
router.put('/:id', (req, res) => {
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Object.findById(id)
        .then(object => {
            // if the owner of the object is the person who is logged in
            if (object.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // update and save the object
                return object.updateOne(req.body)
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20object`)
            }
        })
        .then(() => {
            // console.log('the object?', object)
            res.redirect(`/objects/mine`)
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// DELETE route
// Delete -> delete a specific object
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Object.findById(id)
        .then(object => {
            // if the owner of the object is the person who is logged in
            if (object.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // delete the object
                return object.deleteOne()
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20object`)
            }
        })
        .then(() => {
            res.redirect('/objects/mine')
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Object.findById(id)
        .populate('comments.author', 'username')
        // send the object as json upon success
        .then(object => {
            // res.json({ object: object })
            res.render('objects/show.liquid', {object, ...req.session})
        })
        // catch any errors
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router

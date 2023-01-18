// import mongoose
const mongoose = require('mongoose')

// destructure Schema and model
const { Schema, model } = mongoose

// Object schema
const objectSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requires: true
    }
})

const Object = model('Object', objectSchema)

module.exports = Object
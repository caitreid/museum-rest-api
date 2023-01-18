// import mongoose
const mongoose = require('mongoose')

// destructure Schema and model
const { Schema, model } = mongoose

// Object schema
const objectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    period: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    culture: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    onView: {
        type: Boolean,
        required: true,
    },
})

const Object = model('Object', objectSchema)

module.exports = Object
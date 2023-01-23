// import mongoose
// const mongoose = require('mongoose')
const mongoose = require('../utils/connection')

const commentSchema = require('./comment')

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
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    culture: {
        type: String,
        required: false
    },
    medium: {
        type: String,
        required: false
    },
    classification: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    onView: {
        type: Boolean
    },
    owner: {
        // this is where we set up an objectId reference
        // by declaring that as the type
        type: Schema.Types.ObjectId,
        // this line tells us which model to look at
        ref: 'User'
    },
    comments: [commentSchema]
}, 
{ timestamps: true })

const Object = model('Object', objectSchema)

module.exports = Object
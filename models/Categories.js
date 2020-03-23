'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let CategorySchema = new Schema({
    _id: Number,
    internalid: String,
    title: String,
    tag: String,
    image: String
},{collection: 'category'});

module.exports = mongoose.model('Category', CategorySchema);
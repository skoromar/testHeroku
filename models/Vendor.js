'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let VendorSchema = new Schema({
    id : String,
	name : String,
	internalid : Number,
	category : String,
	zipcode : Number,
	description : String,
	phone : Number,
	activevendor : Boolean,
	logo : String,
	address : String
},{collection: 'vendor'});

module.exports = mongoose.model('Vendor', VendorSchema);
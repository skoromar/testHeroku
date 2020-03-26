var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const autoIncrementModelID = require('./Counter');

let VendorSchema = new Schema({
    id: { type: Number, unique: true, min: 1 },
	name : {type: String},
	category : {type: String},
	zipcode : {type: Number},
	description : String,
	phone : {type: Number},
	activevendor : Boolean,
	logo : {type: String},
	address : {type: String}
},{collection: 'vendor'});

VendorSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('vendor', this, next);
});
module.exports = mongoose.model('Vendor', VendorSchema);
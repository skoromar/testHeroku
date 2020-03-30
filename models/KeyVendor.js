var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);



let KeyVendorSchema = new Schema({
    id: { type: Number},
    name: { type:String},
    key: { type:String}
},{collection: 'keyVendors'});

module.exports = mongoose.model('keyVendors', KeyVendorSchema);
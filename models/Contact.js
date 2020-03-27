var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const autoIncrementModelID = require('./Counter');

let ContactSchema = new Schema({
    id: { type: Number, unique: true, min: 1 },
    name: { type:String},
    lastname: { type:String},
    email: { type:String},
    phone: { type:String},
    status: { type:String},
    mesagge: { type:String}
},{collection: 'contact'});

ContactSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('contact', this, next);
});
module.exports = mongoose.model('Contact', ContactSchema);
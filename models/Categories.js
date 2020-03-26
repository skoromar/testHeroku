var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const autoIncrementModelID = require('./Counter');

let CategorySchema = new Schema({
    id: { type: Number, unique: true, min: 1 },
    name: { type:String},
    image: { type:String}
},{collection: 'category'});

CategorySchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('category', this, next);
});
module.exports = mongoose.model('Category', CategorySchema);
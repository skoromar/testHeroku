var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const autoIncrementModelID = require('./Counter');

let ProductsSchema = new Schema({
    product_id: Number,
    id: { type:String},
    title: { type:String},
    description: { type:String},
    manufacturer: { type:String},
    price: { type: Number},
    image: { type:String},
    vendor:{ type: Number},
    category: { type:String}
},{collection: 'products'});

ProductsSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('products', this, next);
});

module.exports = mongoose.model('Products', ProductsSchema);
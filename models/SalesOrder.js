// eventModel.js

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const autoIncrementModelID = require('./Counter');

// Setup schema
var salesOrderSchema = mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    status: {type: Number},
    customer: {type: Number},
    zip:{type: Number},
    deliveryDate:{type: Date,},
    total:{type: Schema.Types.Double},
    shipAdrress:{type: String},
    shipCost:{type: Schema.Types.Double},
    cuponcode:{type: String},
    discount:{type: Schema.Types.Double},
    cart: {type: Schema.Types.Mixed},
    date: {type: Date,default: Date.now}
});


salesOrderSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('salesorder', this, next);
});
// Export listen model
var SalesOrder = module.exports = mongoose.model('salesorder', salesOrderSchema);
module.exports.get = function (callback, limit) {
    SalesOrder.find(callback).limit(limit);
}
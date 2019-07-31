var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({
  vendor_cat_name: String,
}, { collection: 'customer' });

mongoose.model('customer', CustomerSchema);

module.exports = mongoose.model('customer');
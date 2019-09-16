var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({
email: String,
  password: String,
  customer_id: String,
}, { collection: 'customer' });

mongoose.model('customer', CustomerSchema);

module.exports = mongoose.model('customer');
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var VendorcatSchema = new mongoose.Schema({
  vendor_cat_name: String,
}, { collection: 'vendor_category' });

mongoose.model('vendor_category', VendorcatSchema);

module.exports = mongoose.model('vendor_category');
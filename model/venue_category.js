var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var VenuecatSchema = new mongoose.Schema({
    venue_cat_name: String,
}, { collection: 'venue_category' });

mongoose.model('venue_category', VenuecatSchema);

module.exports = mongoose.model('venue_category');
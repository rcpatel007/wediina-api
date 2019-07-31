var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var VenueSchema = new mongoose.Schema({
    venue_cat_id:String,
    fname: String,
    lname: String,
    companyName: String,
    contactno: String,
    email: String,
    gstno: String,
    password: String,
    address: String,
    city: String,
    state: String,
    venue: Array
}, { collection: 'venues' });

mongoose.model('venues', VenueSchema);

module.exports = mongoose.model('venues');